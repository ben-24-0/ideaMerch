import { Router } from 'express';
import { verifyAdmin } from '../middleware/auth.middleware.js';
import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller.js';

const router = Router();

router.get('/', listCategories);
router.post('/', verifyAdmin, createCategory);
router.patch('/:id', verifyAdmin, updateCategory);
router.delete('/:id', verifyAdmin, deleteCategory);

export default router;
