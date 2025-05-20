// import express from "express";
// import dotenv from "dotenv";
// import cookieParser from "cookie-parser";
// import cors from "cors";
// import authRoutes from "./src/routes/authRoutes.js";
// import userRoutes from "./src/routes/user.routes.js";
// import paymentRoutes from "./src/routes/payment.routes.js";
// import activityRoute from "./src/routes/activity.route.js";
// import { errorHandler, notFound } from "./src/middleware/error.middleware.js";

// dotenv.config();

// const app = express();
// app.use(express.json());
// app.use(cookieParser());
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//   })
// );

// app.use("/api/auth", authRoutes);
// app.use("/api", userRoutes);
// app.use("/api/payment", paymentRoutes);
// app.use("/api/activity", activityRoute);

// app.use(notFound);
// app.use(errorHandler);
// const port = process.env.PORT || 5000;

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });

import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import http from "http";
import { Server as SocketServer } from "socket.io";

import authRoutes from "./src/routes/authRoutes.js";
import userRoutes from "./src/routes/user.routes.js";
import paymentRoutes from "./src/routes/payment.routes.js";
import activityRoute from "./src/routes/activity.route.js";
import { errorHandler, notFound } from "./src/middleware/error.middleware.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/activity", activityRoute);

// Error Handling
app.use(notFound);
app.use(errorHandler);

// Create HTTP Server
const server = http.createServer(app);

// Initialize Socket.IO
const io = new SocketServer(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

// Online Users Map: userId -> socketId
const onlineUsers = new Map();

// Socket.IO Events
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // User comes online
  socket.on("user-online", (userId) => {
    onlineUsers.set(userId, socket.id);
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  // Handle explicit offline (optional)
  socket.on("user-offline", (userId) => {
    onlineUsers.delete(userId);
    io.emit("online-users", Array.from(onlineUsers.keys()));
  });

  // User disconnects (remove user by socket id)
  socket.on("disconnect", () => {
    for (const [userId, socketId] of onlineUsers.entries()) {
      if (socketId === socket.id) {
        onlineUsers.delete(userId);
        break;
      }
    }
    io.emit("online-users", Array.from(onlineUsers.keys()));
    console.log("User disconnected:", socket.id);
  });
});

// Start Server
server.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
