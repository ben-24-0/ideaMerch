import { Router } from "express";

import { verifyAdmin } from "../middleware/auth.middleware.js";

import {
  listProducts,
  getProductBySlug,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const router = Router();

// Public
router.get("/", listProducts);
router.get("/:slug", getProductBySlug);

// Admin
router.get("/admin/:id", verifyAdmin, getProductById);
router.post("/", verifyAdmin, createProduct);
router.patch("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;