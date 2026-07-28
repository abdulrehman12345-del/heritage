import { Request, Response } from 'express';
import Review from '../models/Review';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

export const getProductReviews = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({
      product: productId,
      status: 'Published',
    }).sort({ createdAt: -1 });

    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const createReview = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ success: false, message: 'Rating and comment are required.' });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product artifact not found.' });
    }

    const review = await Review.create({
      user: req.user!._id,
      userName: req.user!.fullName,
      userAvatar: req.user!.profileImage || '',
      product: productId,
      productName: product.productName,
      rating,
      comment,
      status: 'Published',
    });

    res.status(201).json({ success: true, message: 'Review submitted successfully.', review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getAllReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: reviews.length, reviews });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const approveReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndUpdate(id, { status: 'Published' }, { new: true });
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, message: 'Review published.', review });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const deleteReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await Review.findByIdAndDelete(id);
    if (!review) return res.status(404).json({ success: false, message: 'Review not found.' });
    res.status(200).json({ success: true, message: 'Review deleted.' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
