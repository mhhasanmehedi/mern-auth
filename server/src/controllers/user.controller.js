import asyncHandler from "../middleware/asyncHandler.js";
import db from "../utils/db.js";

export const allUsers = asyncHandler(async (req, res, next) => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      created_at: true,
      updated_at: true,
    },
  });

  res.status(200).json({
    success: true,
    users,
  });
});
