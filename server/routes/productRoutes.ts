import { Router } from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  updateInventory,
} from '../controllers/productController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, authorize('Admin'), createProduct);
router.put('/:id', protect, authorize('Admin'), updateProduct);
router.delete('/:id', protect, authorize('Admin'), deleteProduct);
router.put('/:id/inventory', protect, authorize('Admin'), updateInventory);

export default router;
