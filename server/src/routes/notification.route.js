import express from "express";
import {
  authenticateSocket,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";
import {
  createNotification,
  getAllNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.get("/", isAuthenticatedUser, getAllNotifications);
router.post("/", isAuthenticatedUser, createNotification);

export default router;
