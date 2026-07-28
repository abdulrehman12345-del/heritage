import { Router } from 'express';
import {
  getHomepageCMS,
  updateHomepageCMS,
  getWebsiteSettings,
  updateWebsiteSettings,
} from '../controllers/cmsController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/homepage', getHomepageCMS);
router.put('/homepage', protect, authorize('Admin'), updateHomepageCMS);
router.get('/settings', getWebsiteSettings);
router.put('/settings', protect, authorize('Admin'), updateWebsiteSettings);

export default router;
