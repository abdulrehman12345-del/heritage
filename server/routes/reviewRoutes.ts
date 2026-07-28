import { Router } from 'express';
import {
  getProductReviews,
  createReview,
  getAllReviews,
  approveReview,
  deleteReview,
} from '../controllers/reviewController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/product/:productId', getProductReviews);
router.post('/', protect, createReview);
router.get('/all', protect, authorize('Admin'), getAllReviews);
router.put('/:id/approve', protect, authorize('Admin'), approveReview);
router.delete('/:id', protect, authorize('Admin'), deleteReview);

export default router;
