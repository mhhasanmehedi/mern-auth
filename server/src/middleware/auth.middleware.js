import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import db from "../utils/db.js";

export const isAuthenticatedUser = asyncHandler(async (req, res, next) => {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new ErrorHandler("Login first to access this resource.", 401));
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await db.User.findUnique({
    where: {
      id: decoded.userId,
    },
  });

  next();
});

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new Error(
          `Role (${req.user.role}) is not allowed to access this resource`,
          403
        )
      );
    }

    next();
  };
};
