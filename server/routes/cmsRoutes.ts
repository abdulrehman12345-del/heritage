import { Router } from 'express';
import {
  getHomepageCMS,
  updateHomepageCMS,
  getWebsiteSettings,
  updateWebsiteSettings,
  saveFounderPhoto,
  getFounderPhoto,
} from '../controllers/cmsController';
import { protect, authorize } from '../middleware/auth';

const router = Router();

router.get('/homepage', getHomepageCMS);
router.put('/homepage', protect, authorize('Admin'), updateHomepageCMS);
router.get('/settings', getWebsiteSettings);
router.put('/settings', protect, authorize('Admin'), updateWebsiteSettings);
router.get('/founder-photo', getFounderPhoto);
router.post('/founder-photo', saveFounderPhoto);

export default router;
