import express, { Router } from "express";
const router = express.Router();
import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  getUserById,
  forgotPassword,
  resetPassword,
  getUserCount,
  googleLogin,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile/:id")
  .get(protect, getUserProfile);
router.route("/getusercount").get(protect, admin, getUserCount);

router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);

router.post("/googlelogin", googleLogin);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
