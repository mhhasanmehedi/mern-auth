import express from "express";
import {
  createChatrabash,
  getAllChatrabash,
  updateChatrabash,
  deleteChatrabash,
  getChatrabashByUser,
  getChatrabashByLocation,
} from "../controllers/chatrabash.controller.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create a new Chatrabash
router.post("/", isAuthenticatedUser, createChatrabash);

// Get all Chatrabash entries
router.get("/", isAuthenticatedUser, getAllChatrabash);

// Get Chatrabash by owner/user ID
router.get("/user/:userId", isAuthenticatedUser, getChatrabashByUser);

// Get Chatrabash by location
router.get("/location/:location", getChatrabashByLocation);

// Update a Chatrabash by ID
router.put("/:id", isAuthenticatedUser, updateChatrabash);

// Delete a Chatrabash by ID
router.delete("/:id", isAuthenticatedUser, deleteChatrabash);

export default router;
