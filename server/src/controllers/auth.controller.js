import asyncHandler from "../middleware/asyncHandler.js";
import db from "../utils/db.js";
import generateToken from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    if (!email || !password || !name) {
      throw new Error("All fields are required");
    }

    const isExists = await db.user.findUnique({
      where: { email },
    });

    if (isExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Create activity record
    await db.activity.create({
      data: {
        action: "register",
        detail: `${newUser.name} registered with email ${newUser.email}`,
        userId: newUser.id,
      },
    });

    generateToken(res, newUser.id);

    const { password: _, ...info } = newUser;

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user: info,
    });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Create activity record
    await db.activity.create({
      data: {
        action: "login",
        detail: `${user.name} logged in`,
        userId: user.id,
      },
    });

    generateToken(res, user.id);

    const { password: _, ...info } = user;

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      user: info,
    });
  } catch (error) {
    console.log("Error in login ", error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getUserProfile = asyncHandler(async (req, res, next) => {
  const user = await db.user.findUnique({
    where: {
      id: req.user.id,
    },
  });

  res.status(200).json({
    success: true,
    user,
  });
});

export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("jwt", "", {
    expires: new Date(0),
    httpOnly: true,
  });
  res.status(200).json({ message: "User Logged Out" });
});
