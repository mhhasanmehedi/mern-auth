import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Server } from "socket.io";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/user.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import activityRoute from "./src/routes/activity.route.js";
import notificationRoute from "./src/routes/notification.route.js";
import { errorHandler, notFound } from "./src/middleware/error.middleware.js";
import { authenticateSocket } from "./src/middleware/auth.middleware.js";

dotenv.config();

const port = process.env.PORT || 5000;

const app = express();
app.use(express.json());
app.use(helmet());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/activity", activityRoute);
app.use("/api/notifications", notificationRoute);

app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

// Set up Socket.IO with the existing Express server
export const io = new Server(server, {
  cors: {
    origin: "*", // Allow CORS for all origins
  },
});

// Use authentication middle for websocket connection
io.use(authenticateSocket);

// Handle Websocket connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Extract userId from socket authentication and join a room
  const userId = socket.user.id;

  // Join the user to a room with their userId
  socket.join(userId);

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});
