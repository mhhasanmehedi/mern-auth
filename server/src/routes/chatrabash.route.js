import express from "express";
import {
  createChatrabash,
  getAllChatrabash,
  updateChatrabash,
  deleteChatrabash,
  getChatrabashByUser,
  getChatrabashByLocation,
  getSingleChatrabash,
} from "../controllers/chatrabash.controller.js";
import { isAuthenticatedUser } from "../middleware/auth.middleware.js";

const router = express.Router();

// Create a new Chatrabash
router.post("/", isAuthenticatedUser, createChatrabash);

// Get all Chatrabash entries
// router.get("/", isAuthenticatedUser, getAllChatrabash);

// Update a Chatrabash by ID
router.get("/:id", isAuthenticatedUser, getSingleChatrabash);

// Update a Chatrabash by ID
router.put("/:id", isAuthenticatedUser, updateChatrabash);

// Delete a Chatrabash by ID
router.delete("/:id", isAuthenticatedUser, deleteChatrabash);

// Get Chatrabash by owner/user ID
router.get("/", isAuthenticatedUser, getChatrabashByUser);

// Get Chatrabash by location
router.get("/location/:location", getChatrabashByLocation);

export default router;
