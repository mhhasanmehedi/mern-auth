import express from "express";
import { getActivities } from "../controllers/activity.controller.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", isAuthenticatedUser, authorizeRoles("admin"), getActivities);

export default router;
