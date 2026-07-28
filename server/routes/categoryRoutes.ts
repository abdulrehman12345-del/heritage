import { Router } from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getCategories);
router.post('/', protect, authorize('Admin'), createCategory);
router.put('/:id', protect, authorize('Admin'), updateCategory);
router.delete('/:id', protect, authorize('Admin'), deleteCategory);

export default router;
