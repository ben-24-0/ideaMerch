import { Router } from 'express';
import { verifyAdmin } from '../middleware/auth.middleware.js';
import { getStats } from '../controllers/stats.controller.js';

const router = Router();

router.get('/', verifyAdmin, getStats);

export default router;
