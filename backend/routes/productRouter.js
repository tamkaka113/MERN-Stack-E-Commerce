import express from "express";
const router = express.Router();
import {
  getAllProducts,
  getSingleProduct,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReviews
} from "../controllers/productController.js";
import {uploadImageController} from '../controllers/uploadImageController.js'
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").get(getAllProducts).post(protect,admin,createProduct)
router.post('/uploads',protect,admin,uploadImageController)
router
  .route("/:id")
  .get(getSingleProduct)
  .delete(protect, admin, deleteProduct)
  .put(protect,admin, updateProduct)

router.post('/:id/reviews',protect,createProductReviews)
export default router;
