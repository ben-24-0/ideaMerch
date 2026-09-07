import { Router } from 'express';
import { verifyAdmin } from '../middleware/auth.middleware.js';
import { listTypes, createType, updateType, deleteType } from '../controllers/type.controller.js';

const router = Router();

router.get('/', listTypes);
router.post('/', verifyAdmin, createType);
router.patch('/:id', verifyAdmin, updateType);
router.delete('/:id', verifyAdmin, deleteType);

export default router;
