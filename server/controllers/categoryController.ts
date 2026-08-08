import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Category from '../models/Category';
import { supabaseServer } from '../config/supabase';

const createSlug = (name: string) => {
  return name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};

const isValidObjectId = (id: string) => mongoose.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find().sort({ categoryName: 1 });
    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { categoryName, description, image, status } = req.body;
    if (!categoryName) {
      return res.status(400).json({ success: false, message: 'Category name is required.' });
    }

    const slug = createSlug(categoryName);
    const category = await Category.create({
      categoryName,
      slug,
      description: description || '',
      image: image || 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=800',
      status: status || 'Active',
    });

    // Sync to Supabase
    try {
      await supabaseServer.from('categories').upsert([
        {
          id: category._id.toString(),
          name: categoryName,
          category_name: categoryName,
          description: description || '',
          image: image || '',
          slug,
          status: status || 'Active',
          created_at: new Date().toISOString()
        }
      ], { onConflict: 'name' });
    } catch (spErr) {
      console.warn('[Supabase Category Sync Warning]:', spErr);
    }

    res.status(201).json({ success: true, message: 'Category created.', category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (req.body.categoryName) {
      req.body.slug = createSlug(req.body.categoryName);
    }
    
    let category = null;
    if (isValidObjectId(id)) {
      category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    }
    if (!category) {
      category = await Category.findOneAndUpdate(
        { $or: [{ slug: id }, { categoryName: id }] },
        req.body,
        { new: true }
      );
    }

    // Sync to Supabase
    try {
      await supabaseServer.from('categories').update({
        name: req.body.categoryName || category?.categoryName,
        category_name: req.body.categoryName || category?.categoryName,
        description: req.body.description || category?.description,
        image: req.body.image || category?.image,
        slug: req.body.slug || category?.slug,
        status: req.body.status || category?.status
      }).or(`id.eq.${id}${category?.categoryName ? `,name.eq.${category.categoryName}` : ''}`);
    } catch (spErr) {
      console.warn('[Supabase Category Update Sync Warning]:', spErr);
    }

    res.status(200).json({ success: true, message: 'Category updated.', category: category || { _id: id, ...req.body } });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let category = null;
    if (isValidObjectId(id)) {
      category = await Category.findByIdAndDelete(id);
    }
    if (!category) {
      category = await Category.findOneAndDelete({
        $or: [{ slug: id }, { categoryName: id }]
      });
    }

    // Sync to Supabase
    try {
      const matchCriteria = category?.categoryName ? `id.eq.${id},name.eq.${category.categoryName}` : `id.eq.${id}`;
      await supabaseServer.from('categories').delete().or(matchCriteria);
    } catch (spErr) {
      console.warn('[Supabase Category Delete Sync Warning]:', spErr);
    }

    res.status(200).json({ success: true, message: 'Category deleted.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};


