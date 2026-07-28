import { Response } from 'express';
import Wishlist from '../models/Wishlist';
import { AuthRequest } from '../middleware/auth';

export const getWishlist = async (req: AuthRequest, res: Response) => {
  try {
    let wishlist = await Wishlist.findOne({ user: req.user!._id }).populate('products');
    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user!._id, products: [] });
    }
    res.status(200).json({ success: true, wishlist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.body;
    let wishlist = await Wishlist.findOne({ user: req.user!._id });

    if (!wishlist) {
      wishlist = await Wishlist.create({ user: req.user!._id, products: [] });
    }

    if (!wishlist.products.includes(productId)) {
      wishlist.products.push(productId);
      await wishlist.save();
    }

    await wishlist.populate('products');
    res.status(200).json({ success: true, message: 'Added to private wishlist.', wishlist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromWishlist = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const wishlist = await Wishlist.findOne({ user: req.user!._id });

    if (wishlist) {
      wishlist.products = wishlist.products.filter(
        (p) => p.toString() !== productId
      );
      await wishlist.save();
      await wishlist.populate('products');
    }

    res.status(200).json({ success: true, message: 'Removed from wishlist.', wishlist });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
