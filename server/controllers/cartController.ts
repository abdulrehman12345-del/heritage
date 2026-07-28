import { Response } from 'express';
import Cart from '../models/Cart';
import { AuthRequest } from '../middleware/auth';

export const getCart = async (req: AuthRequest, res: Response) => {
  try {
    let cart = await Cart.findOne({ user: req.user!._id }).populate('items.product');
    if (!cart) {
      cart = await Cart.create({ user: req.user!._id, items: [] });
    }
    res.status(200).json({ success: true, cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const addToCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user!._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user!._id, items: [] });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity || 1;
    } else {
      cart.items.push({ product: productId, quantity: quantity || 1 });
    }

    await cart.save();
    cart = await cart.populate('items.product');

    res.status(200).json({ success: true, message: 'Added to acquisition cart.', cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ user: req.user!._id });

    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found.' });

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      await cart.save();
      await cart.populate('items.product');
    }

    res.status(200).json({ success: true, cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const removeFromCart = async (req: AuthRequest, res: Response) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ user: req.user!._id });

    if (cart) {
      cart.items = cart.items.filter((item) => item.product.toString() !== productId);
      await cart.save();
      await cart.populate('items.product');
    }

    res.status(200).json({ success: true, message: 'Item removed from cart.', cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const clearCart = async (req: AuthRequest, res: Response) => {
  try {
    const cart = await Cart.findOneAndUpdate(
      { user: req.user!._id },
      { items: [] },
      { new: true }
    );
    res.status(200).json({ success: true, message: 'Cart cleared.', cart });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
