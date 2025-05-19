import jwt from "jsonwebtoken";
import db from "../utils/db";

export const verifyToken = async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await db.User.findUnique({
        where: {
          id: decoded.userId,
        },
      });
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, invalid token");
  }
};
