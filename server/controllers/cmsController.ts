import { Request, Response } from 'express';
import HomepageCMS from '../models/HomepageCMS';
import WebsiteSettings from '../models/WebsiteSettings';

export const getHomepageCMS = async (req: Request, res: Response) => {
  try {
    let cms = await HomepageCMS.findOne().populate('featuredProducts');
    if (!cms) {
      cms = await HomepageCMS.create({
        heroTitle: 'Timeless Antiquities & Royal Masterpieces',
        heroSubtitle: 'Curated Heritage Vault',
        heroDescription: 'Discover rare, museum-verified artifacts, ancient sculptures, and royal heirlooms preserved across centuries.',
        testimonials: [
          {
            collectorName: 'Lord Harrington',
            title: 'Senior Curator',
            location: 'Mayfair, London',
            quote: 'Heritage Antiques provided certified provenance and seamless white-glove transport for our Renaissance bronzes.',
            avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
            rating: 5,
          },
        ],
      });
    }
    res.status(200).json({ success: true, cms });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateHomepageCMS = async (req: Request, res: Response) => {
  try {
    let cms = await HomepageCMS.findOne();
    if (!cms) {
      cms = new HomepageCMS(req.body);
    } else {
      Object.assign(cms, req.body);
    }
    await cms.save();
    res.status(200).json({ success: true, message: 'Homepage CMS updated.', cms });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getWebsiteSettings = async (req: Request, res: Response) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = await WebsiteSettings.create({});
    }
    res.status(200).json({ success: true, settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateWebsiteSettings = async (req: Request, res: Response) => {
  try {
    let settings = await WebsiteSettings.findOne();
    if (!settings) {
      settings = new WebsiteSettings(req.body);
    } else {
      Object.assign(settings, req.body);
    }
    await settings.save();
    res.status(200).json({ success: true, message: 'Website settings updated.', settings });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getFounderPhoto = async (req: Request, res: Response) => {
  try {
    const fs = await import('fs');
    const path = await import('path');
    const photoPath = path.join(process.cwd(), 'public', 'founder.png');
    if (fs.existsSync(photoPath)) {
      return res.status(200).json({ success: true, exists: true, url: '/founder.png' });
    }
    return res.status(200).json({ success: true, exists: false, url: null });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const saveFounderPhoto = async (req: Request, res: Response) => {
  try {
    const { image } = req.body;
    if (!image) {
      return res.status(400).json({ success: false, message: 'No image data provided' });
    }

    const fs = await import('fs');
    const path = await import('path');
    const publicDir = path.join(process.cwd(), 'public');

    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    if (image.startsWith('data:image/')) {
      const matches = image.match(/^data:image\/([a-zA-Z0-9+]+);base64,(.+)$/);
      if (matches) {
        const buffer = Buffer.from(matches[2], 'base64');
        fs.writeFileSync(path.join(publicDir, 'founder.png'), buffer);
      }
    } else if (image.startsWith('http://') || image.startsWith('https://')) {
      const response = await fetch(image);
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      fs.writeFileSync(path.join(publicDir, 'founder.png'), buffer);
    }

    res.status(200).json({ success: true, url: '/founder.png' });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

