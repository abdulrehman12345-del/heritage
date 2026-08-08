import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';
import Category from '../models/Category';
import { supabaseServer } from '../config/supabase';

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);

// Helper to create URL slug from title
const createSlug = (title: string) => {
  return title
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

// @desc    Get all products
// @route   GET /api/v1/products
// @access  Public
export const getProducts = async (req: Request, res: Response) => {
  try {
    const { category, featured, search, status } = req.query;
    let query: any = {};

    if (category && category !== 'All') {
      query.categoryName = new RegExp(`^${category}$`, 'i');
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$or = [
        { productName: new RegExp(search as string, 'i') },
        { description: new RegExp(search as string, 'i') },
        { material: new RegExp(search as string, 'i') },
        { origin: new RegExp(search as string, 'i') },
        { historicalEra: new RegExp(search as string, 'i') },
      ];
    }

    const products = await Product.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching products.',
    });
  }
};

// @desc    Get single product
// @route   GET /api/v1/products/:id
// @access  Public
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let product;

    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      product = await Product.findById(id);
    } else {
      product = await Product.findOne({ slug: id });
    }

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product artifact not found.',
      });
    }

    res.status(200).json({
      success: true,
      product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error fetching product details.',
    });
  }
};

// @desc    Create product (Admin only)
// @route   POST /api/v1/products
// @access  Private/Admin
export const createProduct = async (req: Request, res: Response) => {
  try {
    const {
      productName,
      categoryName,
      description,
      price,
      salePrice,
      stock,
      sku,
      images,
      thumbnail,
      material,
      origin,
      historicalEra,
      dimensions,
      condition,
      featured,
      status,
      certificateId,
      provenance,
    } = req.body;

    if (!productName || !price || !thumbnail) {
      return res.status(400).json({
        success: false,
        message: 'Product name, price, and thumbnail are required.',
      });
    }

    const generatedSlug = createSlug(productName) + '-' + Math.floor(1000 + Math.random() * 9000);
    const generatedSku = sku || `HA-SKU-${Math.floor(10000 + Math.random() * 90000)}`;

    const product = await Product.create({
      productName,
      slug: generatedSlug,
      categoryName: categoryName || 'Sculptures',
      description: description || 'Masterpiece antique artifact with authenticated provenance.',
      price,
      salePrice: salePrice || 0,
      stock: stock !== undefined ? stock : 1,
      sku: generatedSku,
      images: images || [thumbnail],
      thumbnail,
      material: material || 'Bronze & Gold Leaf',
      origin: origin || 'Florence, Italy',
      historicalEra: historicalEra || '18th Century',
      dimensions: dimensions || '45cm x 30cm x 22cm',
      condition: condition || 'Museum Quality',
      featured: featured || false,
      status: status || 'Available',
      certificateId: certificateId || `HA-CERT-${Math.floor(1000 + Math.random() * 9000)}`,
      provenance: provenance || 'Private European Royal Collection',
    });

    // Sync to Supabase products & artifacts tables
    try {
      const spPayload = {
        id: product._id.toString(),
        title: productName,
        product_name: productName,
        category: categoryName || 'Sculptures',
        category_name: categoryName || 'Sculptures',
        description: description || '',
        price,
        image: thumbnail,
        thumbnail,
        secondary_images: JSON.stringify(images || [thumbnail]),
        material: material || '',
        origin: origin || '',
        era: historicalEra || '',
        dimensions: dimensions || '',
        condition: condition || 'Museum Grade',
        featured: featured || false,
        certificate_number: certificateId || '',
        curator_notes: provenance || '',
        stock: stock || 1,
        sku: generatedSku,
        created_at: new Date().toISOString()
      };

      const { error: spErr } = await supabaseServer.from('products').upsert([spPayload]);
      if (spErr) {
        await supabaseServer.from('artifacts').upsert([{
          id: product._id.toString(),
          title: productName,
          category: categoryName || 'Sculptures',
          period: historicalEra || 'Historical',
          origin: origin || 'Unknown',
          estimated_value: `$${price}`,
          image_url: thumbnail,
          description: description || '',
          provenance: provenance || 'Private Collection',
          year: historicalEra || 'Ancient',
          featured: featured || false
        }]);
      }
    } catch (spError) {
      console.warn('[Supabase Product Sync Warning]:', spError);
    }

    res.status(201).json({
      success: true,
      message: 'Product artifact created successfully.',
      product,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error creating product artifact.',
    });
  }
};

// @desc    Update product (Admin only)
// @route   PUT /api/v1/products/:id
// @access  Private/Admin
export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let product = null;
    if (isValidObjectId(id)) {
      product = await Product.findById(id);
    }
    if (!product) {
      product = await Product.findOne({ $or: [{ slug: id }, { sku: id }, { productName: id }] });
    }

    if (product) {
      if (req.body.productName && req.body.productName !== product.productName) {
        req.body.slug = createSlug(req.body.productName) + '-' + Math.floor(1000 + Math.random() * 9000);
      }

      product = await Product.findByIdAndUpdate(product._id, req.body, {
        new: true,
        runValidators: true,
      });
    }

    // Sync to Supabase
    try {
      await supabaseServer.from('products').update({
        title: req.body.productName || product?.productName,
        product_name: req.body.productName || product?.productName,
        category: req.body.categoryName || product?.categoryName,
        category_name: req.body.categoryName || product?.categoryName,
        description: req.body.description || product?.description,
        price: req.body.price || product?.price,
        image: req.body.thumbnail || product?.thumbnail,
        thumbnail: req.body.thumbnail || product?.thumbnail,
        featured: req.body.featured !== undefined ? req.body.featured : product?.featured
      }).or(`id.eq.${id}${product?.sku ? `,sku.eq.${product.sku}` : ''}`);

      await supabaseServer.from('artifacts').update({
        title: req.body.productName || product?.productName,
        category: req.body.categoryName || product?.categoryName,
        image_url: req.body.thumbnail || product?.thumbnail,
        description: req.body.description || product?.description,
        featured: req.body.featured !== undefined ? req.body.featured : product?.featured
      }).eq('id', id);
    } catch (spError) {
      console.warn('[Supabase Product Update Sync Warning]:', spError);
    }

    res.status(200).json({
      success: true,
      message: 'Product artifact updated successfully.',
      product: product || { _id: id, ...req.body },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating product artifact.',
    });
  }
};

// @desc    Delete product (Admin only)
// @route   DELETE /api/v1/products/:id
// @access  Private/Admin
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let product = null;
    if (isValidObjectId(id)) {
      product = await Product.findByIdAndDelete(id);
    }
    if (!product) {
      product = await Product.findOneAndDelete({ $or: [{ slug: id }, { sku: id }, { productName: id }] });
    }

    // Sync to Supabase
    try {
      const matchCriteria = product?.sku ? `id.eq.${id},sku.eq.${product.sku}` : `id.eq.${id}`;
      await supabaseServer.from('products').delete().or(matchCriteria);
      await supabaseServer.from('artifacts').delete().eq('id', id);
    } catch (spError) {
      console.warn('[Supabase Product Delete Sync Warning]:', spError);
    }

    res.status(200).json({
      success: true,
      message: 'Product artifact deleted successfully.',
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error deleting product artifact.',
    });
  }
};

// @desc    Update Inventory (Admin only)
// @route   PUT /api/v1/products/:id/inventory
// @access  Private/Admin
export const updateInventory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { stock, status } = req.body;

    let product = null;
    if (isValidObjectId(id)) {
      product = await Product.findByIdAndUpdate(
        id,
        { stock, status: status || (stock <= 0 ? 'Sold' : 'Available') },
        { new: true }
      );
    }
    if (!product) {
      product = await Product.findOneAndUpdate(
        { $or: [{ slug: id }, { sku: id }] },
        { stock, status: status || (stock <= 0 ? 'Sold' : 'Available') },
        { new: true }
      );
    }

    res.status(200).json({
      success: true,
      message: 'Inventory updated successfully.',
      product: product || { _id: id, stock, status },
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Error updating inventory.',
    });
  }
};
