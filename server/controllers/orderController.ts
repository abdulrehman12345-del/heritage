import { Response } from 'express';
import Order from '../models/Order';
import Cart from '../models/Cart';
import Product from '../models/Product';
import { AuthRequest } from '../middleware/auth';

// @desc    Create new order
// @route   POST /api/v1/orders
// @access  Private (Customer)
export const createOrder = async (req: AuthRequest, res: Response) => {
  try {
    const { orderedProducts, totalPrice, shippingAddress, paymentMethod } = req.body;

    if (!orderedProducts || orderedProducts.length === 0) {
      return res.status(400).json({ success: false, message: 'No ordered products provided.' });
    }

    const trackingNumber = `HA-TRK-${Math.floor(100000 + Math.random() * 900000)}`;

    const order = await Order.create({
      user: req.user!._id,
      clientName: req.user!.fullName,
      clientEmail: req.user!.email,
      orderedProducts,
      totalPrice,
      shippingAddress: shippingAddress || {
        street: req.user!.address || '42 Grosvenor Street',
        city: req.user!.city || 'London',
        country: req.user!.country || 'United Kingdom',
        postalCode: req.user!.postalCode || 'W1K 3JH',
      },
      paymentMethod: paymentMethod || 'Private Escrow Wire Transfer',
      paymentStatus: 'Escrow Secured',
      orderStatus: 'Pending',
      trackingNumber,
    });

    // Clear user cart after placing order
    await Cart.findOneAndUpdate({ user: req.user!._id }, { items: [] });

    // Update stock for ordered products
    for (const item of orderedProducts) {
      if (item.product) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity },
        });
      }
    }

    res.status(201).json({
      success: true,
      message: 'Order placed successfully and held in private escrow.',
      order,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message || 'Error creating order.' });
  }
};

// @desc    Get logged in user orders
// @route   GET /api/v1/orders/my-orders
// @access  Private
export const getMyOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user!._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all orders (Admin)
// @route   GET /api/v1/orders
// @access  Private/Admin
export const getAllOrders = async (req: AuthRequest, res: Response) => {
  try {
    const orders = await Order.find().populate('user', 'fullName email').sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: orders.length, orders });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update order status & tracking (Admin)
// @route   PUT /api/v1/orders/:id/status
// @access  Private/Admin
export const updateOrderStatus = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { orderStatus, trackingNumber, paymentStatus } = req.body;

    const fieldsToUpdate: any = {};
    if (orderStatus) fieldsToUpdate.orderStatus = orderStatus;
    if (trackingNumber) fieldsToUpdate.trackingNumber = trackingNumber;
    if (paymentStatus) fieldsToUpdate.paymentStatus = paymentStatus;

    const order = await Order.findByIdAndUpdate(id, fieldsToUpdate, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });

    res.status(200).json({ success: true, message: 'Order status updated.', order });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};
