import db from "../utils/db.js";
import { io } from "../../server.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const createChatrabash = asyncHandler(async (req, res, next) => {
  const ownerId = req.user.id;

  const { name, location, description } = req.body;

  if (!name || !location || !ownerId) {
    return res
      .status(400)
      .json({ error: "name, location, and ownerId are required" });
  }

  const newChatrabash = await db.chatrabash.create({
    data: {
      name,
      location,
      description,
      ownerId,
    },
  });

  const notification = await db.notification.create({
    data: {
      userId: ownerId,
      message: `A new Chatrabash "${name}" has been created.`,
      type: "chatrabash_created",
    },
  });

  io.to(ownerId.toString()).emit("notification", notification);

  res.status(201).json({
    success: true,
    chatrabash: newChatrabash,
  });
});

export const getAllChatrabash = asyncHandler(async (req, res, next) => {
  const chatrabashList = await db.chatrabash.findMany({
    where: req.user.role !== "admin" ? { ownerId: req.user.id } : undefined,
    orderBy: { createdAt: "desc" },
    include: {
      owner: true,
    },
  });

  res.status(200).json({
    success: true,
    chatrabash: chatrabashList,
  });
});

// Update chatrabash with notification
export const updateChatrabash = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const { id } = req.params;

  const { name, location, description } = req.body;

  const existing = await db.chatrabash.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existing) {
    return res.status(404).json({ error: "Chatrabash not found" });
  }

  if (userId !== parseInt(existing.ownerId)) {
    return res.status(404).json({ error: "You can't delete this chatrabash" });
  }

  const updated = await db.chatrabash.update({
    where: { id: parseInt(id) },
    data: { name, location, description },
  });

  const notification = await db.notification.create({
    data: {
      userId: existing.ownerId,
      message: `Chatrabash "${updated.name}" has been updated.`,
      type: "chatrabash_updated",
    },
  });

  io.to(existing.ownerId.toString()).emit("notification", notification);

  res.status(200).json({
    success: true,
    chatrabash: updated,
  });
});

export const deleteChatrabash = asyncHandler(async (req, res, next) => {
  const userId = req.user.id;

  const { id } = req.params;

  const existing = await db.chatrabash.findUnique({
    where: { id: parseInt(id) },
  });

  if (!existing) {
    return res.status(404).json({ error: "Chatrabash not found" });
  }

  if (userId !== parseInt(existing.ownerId)) {
    return res.status(404).json({ error: "You can't delete this chatrabash" });
  }

  await db.chatrabash.delete({
    where: { id: parseInt(id) },
  });

  const notification = await db.notification.create({
    data: {
      userId: existing.ownerId,
      message: `Chatrabash "${existing.name}" has been deleted.`,
      type: "chatrabash_deleted",
    },
  });

  io.to(existing.ownerId.toString()).emit("notification", notification);

  res.status(200).json({
    success: true,
    message: "Chatrabash deleted successfully",
  });
});

export const getChatrabashByUser = asyncHandler(async (req, res, next) => {
  const { userId } = req.params;

  const chatrabashList = await db.chatrabash.findMany({
    where: { ownerId: parseInt(userId) },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({
    success: true,
    chatrabash: chatrabashList,
  });
});

export const getChatrabashByLocation = asyncHandler(async (req, res, next) => {
  const { location } = req.params;

  const chatrabashList = await db.chatrabash.findMany({
    where: {
      location: {
        contains: location,
        mode: "insensitive", // case-insensitive search
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.status(200).json({
    success: true,
    chatrabash: chatrabashList,
  });
});
