import { Request, Response } from 'express';
import Category from '../models/Category';

const createSlug = (name: string) => {
  return name.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
};

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
    const category = await Category.findByIdAndUpdate(id, req.body, { new: true });
    if (!category) return res.status(404).json({ success: false, message: 'Category not found.' });
    res.status(200).json({ success: true, message: 'Category updated.', category });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) return res.status(404).json({ success: false, message: 'Category not found.' });
    res.status(200).json({ success: true, message: 'Category deleted.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
