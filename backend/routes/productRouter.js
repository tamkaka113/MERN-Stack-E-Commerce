import express from "express";
const router = express.Router();
import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  createProduct
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getAllProducts).post(protect,admin,createProduct);
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(protect, admin, deleteProduct);
  .put(protect,admin, updateProduct)
export default router;
