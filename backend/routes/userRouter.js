import express from "express";
const router = express.Router();
import {
  login,
  register,
  getUserProfile,
  updateUserProfile,
  getUsersByAdmin,
  deleteUser,
  getUserById,
  updateUserByAdmin,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
router.post("/login", login);
router.post("/register", register);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
router.get("/", protect, admin, getUsersByAdmin);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)

  .put(protect, admin, updateUserByAdmin)

  .get(protect, admin, getUserById);
export default router;
