import express from "express";
import { allUsers } from "../controllers/user.controller.js";
import {
  authorizeRoles,
  isAuthenticatedUser,
} from "../middleware/auth.middleware.js";

const router = express.Router();

router.get(
  "/admin/users",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  allUsers
);

export default router;
