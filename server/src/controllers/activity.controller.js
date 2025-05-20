import asyncHandler from "../middleware/asyncHandler.js";
import db from "../utils/db.js";

export const getActivities = asyncHandler(async (req, res, next) => {
  const activities = await db.activity.findMany({
    include: {
      user: true,
    },
    orderBy: {
      created_at: "desc",
    },
  });

  res.json(activities);
});
