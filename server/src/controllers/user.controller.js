import asyncHandler from "../middleware/asyncHandler.js";
import db from "../utils/db.js";

export const allUsers = asyncHandler(async (req, res, next) => {
  const users = await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      last_login: true,
      created_at: true,
      updated_at: true,
    },
  });

  res.status(200).json({
    success: true,
    users,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    res.status(401);
    throw new Error("Unauthorized");
  }

  const { name, phone, address } = req.body;

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  await db.user.update({
    where: { id: userId },
    data: {
      name: name || user.name,
      phone: phone || user.phone,
      address: address || user.address,
    },
  });

  await db.activity.create({
    data: {
      action: "update_profile",
      detail: `${user.name} updated their profile.`,
      userId: userId,
    },
  });

  res.status(200).json({
    success: true,
    message: "Profile Updated Successfully!",
  });
});
