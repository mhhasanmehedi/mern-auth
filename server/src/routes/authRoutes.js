import express from "express";
import {
  getUserProfile,
  login,
  logout,
  register,
} from "../controllers/auth.controller.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/me", isAuthenticatedUser, getUserProfile);

export default router;
