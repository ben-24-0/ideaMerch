import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import productRoutes from './routes/product.routes.js';
import categoryRoutes from './routes/category.routes.js';
import typeRoutes from './routes/type.routes.js';
import statsRoutes from './routes/stats.routes.js';
import uploadRoutes from "./routes/upload.routes.js";
import prisma from "./lib/prisma.js";

const app = express();

app.use(cors());
app.use(express.json());
app.get("/api/health/db", async (req, res) => {
  const start = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;

    res.json({
      ok: true,
      ms: Date.now() - start,
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      ok: false,
      error: "Database connection failed",
    });
  }
});
app.get('/api/health', (req, res) => res.json({ ok: true }));
app.use('/api/admin', authRoutes);
app.use('/api/admin/stats', statsRoutes);
app.use('/api/admin/admins', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/product-types', typeRoutes);
app.use("/api/upload", uploadRoutes);
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`IdeaMerch backend running on port ${PORT}`));
