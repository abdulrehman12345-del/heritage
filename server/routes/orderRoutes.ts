import { Router } from 'express';
import {
  createOrder,
  getMyOrders,
  getAllOrders,
  updateOrderStatus,
} from '../controllers/orderController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.post('/', protect, createOrder);
router.get('/my-orders', protect, getMyOrders);
router.get('/', protect, authorize('Admin'), getAllOrders);
router.put('/:id/status', protect, authorize('Admin'), updateOrderStatus);

export default router;
