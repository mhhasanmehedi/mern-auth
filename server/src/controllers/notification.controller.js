import { io } from "../../server.js";
import asyncHandler from "../middleware/asyncHandler.js";
import db from "../utils/db.js";

export const getAllNotifications = asyncHandler(async (req, res, next) => {
  const notifications = await db.notification.findMany({
    orderBy: { created_at: "desc" },
  });

  res.status(200).json({
    success: true,
    notifications,
  });
});

export const createNotification = asyncHandler(async (req, res, next) => {
  const { userId, message, type } = req.body;
  if (!userId || !message || !type) {
    return res
      .status(400)
      .json({ error: "userId, message, and type are required" });
  }

  const newNotification = await db.notification.create({
    data: {
      userId,
      message,
      type,
    },
  });

  // Emit the notification to the specific user's room
  io.to(userId).emit("notification", newNotification);

  res.status(201).json({
    success: true,
    newNotification,
  });
});
