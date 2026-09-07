import { Router } from "express";
import multer from "multer";

import { verifyAdmin } from "../middleware/auth.middleware.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

router.post(
  "/image",
  verifyAdmin,
  upload.single("image"),
  uploadImage
);

export default router;