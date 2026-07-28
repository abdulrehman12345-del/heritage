import { Router } from 'express';
import {
  register,
  login,
  adminLogin,
  logout,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  updateProfile,
  uploadProfileImage,
  getAllCustomers,
} from '../controllers/authController';
import { protect, authorize } from '../middleware/auth';
import { upload } from '../middleware/upload';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/admin-login', adminLogin);
router.get('/logout', protect, logout);
router.get('/me', protect, getMe);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.put('/change-password', protect, changePassword);
router.put('/update-profile', protect, updateProfile);
router.post('/upload-profile-image', protect, upload.single('image'), uploadProfileImage);
router.get('/customers', protect, authorize('Admin'), getAllCustomers);

export default router;
