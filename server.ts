import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import { connectDB } from './server/config/db';
import { seedDatabase } from './server/seed/seedData';

import authRoutes from './server/routes/authRoutes';
import productRoutes from './server/routes/productRoutes';
import categoryRoutes from './server/routes/categoryRoutes';
import orderRoutes from './server/routes/orderRoutes';
import cartRoutes from './server/routes/cartRoutes';
import wishlistRoutes from './server/routes/wishlistRoutes';
import reviewRoutes from './server/routes/reviewRoutes';
import cmsRoutes from './server/routes/cmsRoutes';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Middleware for JSON body parsing
  app.use(express.json({ limit: '20mb' }));
  app.use(express.urlencoded({ extended: true, limit: '20mb' }));

  // Ensure public uploads directory exists
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }
  app.use('/uploads', express.static(uploadsDir));

  // Connect to Database and Seed initial data
  console.log('Connecting to database...');
  await connectDB();
  await seedDatabase();

  // API Routes
  app.get('/api/v1/health', (req, res) => {
    res.json({ status: 'ok', service: 'Heritage Antiques API', time: new Date() });
  });

  app.use('/api/v1/auth', authRoutes);
  app.use('/api/v1/products', productRoutes);
  app.use('/api/v1/categories', categoryRoutes);
  app.use('/api/v1/orders', orderRoutes);
  app.use('/api/v1/cart', cartRoutes);
  app.use('/api/v1/wishlist', wishlistRoutes);
  app.use('/api/v1/reviews', reviewRoutes);
  app.use('/api/v1/cms', cmsRoutes);

  // Error handling middleware
  app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error('[API Error]:', err);
    res.status(err.status || 500).json({
      success: false,
      message: err.message || 'Internal Server Error',
    });
  });

  // Vite middleware for development vs static build serving for production
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[Heritage Antiques Server] Running at http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start Heritage Antiques server:', err);
});
