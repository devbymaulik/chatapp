import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import path from "path";
import fs from "fs";
import { createJWTToken, refreshJWTToken } from "../utils/jwtUtils.js";
export const signup = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;

    // 1. Check all fields
    if (!name || !email || !password || !confirmpassword) {
      return res.status(400).json({
        message: "Please fill in all required fields.",
      });
    }

    // 2. Check if passwords match
    if (password !== confirmpassword) {
      return res.status(400).json({
        message: "Passwords do not match.",
      });
    }
    // 3. Check if user already exists
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(409).json({
        message: "User already exists with this email.",
      });
    }

    // 4. Hash password and create user
    const newPassword = bcrypt.hashSync(password, 10);
    const newUser = await userModel.create({
      name,
      email,
      password: newPassword,
    });
    // 5. Check if the user was actually created
    if (newUser && newUser._id) {
      return res.status(201).json({
        message: "User created successfully.",
        data: newUser,
      });
    } else {
      return res.status(500).json({
        message: "Failed to create user. Please try again later.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error. Something went wrong on our side.",
      error: error.message,
    });
  }
};
// POST /api/profile/update
export const updateUser = async (req, res) => {
  try {
    const userId = req.user.userID; // Set via auth middleware
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }
    const user = await userModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found." });

    // If email is changing, ensure it's not already taken
    if (email !== user.email) {
      const existing = await userModel.findOne({ email });
      if (existing) {
        return res.status(409).json({ message: "Email already in use." });
      }
    }

    // If new avatar uploaded, store and replace
    if (req.file) {
      const avatarPath = `/uploads/avatars/${req.file.filename}`;

      // Delete old avatar if local file
      if (user.avatar && user.avatar.startsWith("/uploads/")) {
        const oldPath = path.join("public", user.avatar);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }

      user.avatar = avatarPath;
    }

    user.name = name;
    user.email = email;

    await user.save();

    const updatedUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
    };

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("Update error:", error.message);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res
        .status(400)
        .json({ message: "Email and password are required" });

    const user = await userModel.findOne({ email });
    if (!user) return res.status(401).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Incorrect password" });

    // Set tokens as httpOnly cookies
    createJWTToken(user._id, res);

    return res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        avatar: user.avatar,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error. Something went wrong on our side.",
      error: error.message,
    });
  }
};
export const getAllUser = async (req, res) => {
  try {
    const currentUserId = req.user.userID;
    const searchQuery = req.query.q?.trim(); // safely trim the query if exists

    // Base condition: exclude current user
    let query = { _id: { $ne: currentUserId } };

    // If query is present, add search filter on username (case-insensitive)
    if (searchQuery) {
      query.name = { $regex: searchQuery, $options: "i" };
    }

    const userData = await userModel.find(query).select("-password");
    return res.status(200).json({
      success: true,
      message: "Users fetched successfully.",
      data: userData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error. Something went wrong on our side.",
      error: error.message,
    });
  }
};
export const refreshToken = (req, res) => {
  const refreshToken = req.cookies?.refreshToken;
  if (!refreshToken)
    return res.status(401).json({ error: "Refresh token missing" });
  const { success, accessToken, message } = refreshJWTToken(refreshToken);
  if (!success) return res.status(403).json({ error: message });
  const isProd = process.env.NODE_ENV === "production";
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
    maxAge: 15 * 60 * 1000,
  });
  res.status(200).json({ message: "Access token refreshed" });
};
export const logout = (req, res) => {
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  res.status(200).json({ message: "Logged out successfully" });
};
