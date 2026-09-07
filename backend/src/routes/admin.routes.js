import { Router } from 'express';
import { verifyAdmin } from '../middleware/auth.middleware.js';
import {
  listAdmins,
  createAdmin,
  updateAdmin,
  deleteAdmin,
} from '../controllers/admin.controller.js';

const router = Router();

router.use(verifyAdmin);

router.get('/', listAdmins);
router.post('/', createAdmin);
router.patch('/:id', updateAdmin);
router.delete('/:id', deleteAdmin);

export default router;
