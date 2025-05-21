import express from "express";
import { allUsers, updateProfile } from "../controllers/user.controller.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/users", isAuthenticatedUser, authorizeRoles("admin"), allUsers);

router.put("/me/update", isAuthenticatedUser, updateProfile);

export default router;
