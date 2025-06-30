import jwt from "jsonwebtoken";
import { refreshJWTToken } from "../utils/jwtUtils.js";
import userModel from "../models/userModel.js";

export const authVerification = async (req, res, next) => {
  const accessToken = req.cookies?.accessToken;
  const refreshToken = req.cookies?.refreshToken;

  if (!accessToken && !refreshToken) {
    return res.status(401).json({ error: "Unauthorized: No tokens provided" });
  }

  // 1. Try verifying access token if present
  if (accessToken) {
    try {
      const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = decoded; // Attach user info to request
      return next();
    } catch (err) {
      if (err.name !== "TokenExpiredError") {
        return res.status(401).json({ error: "Invalid access token" });
      }
      // else: token expired, try refresh token below
    }
  }

  // 2. Access token missing or expired — try refresh token
  if (!refreshToken) {
    return res.status(401).json({ error: "No refresh token provided" });
  }

  // 3. Validate refresh token and generate new access token
  const refreshResult = refreshJWTToken(refreshToken);
  if (!refreshResult.success) {
    return res.status(401).json({ error: refreshResult.message });
  }

  try {
    // Verify refresh token payload to get userID
    const decodedRefresh = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    // Find user by ID
    const user = await userModel
      .findById(decodedRefresh.userID)
      .select("-password");
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    // Set new access token cookie
    const isProd = process.env.NODE_ENV === "production";
    res.cookie("accessToken", refreshResult.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "Strict",
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

    // Attach user info and continue
    req.user = { userID: user._id };
    next();
  } catch (refreshErr) {
    return res.status(401).json({ error: "Invalid refresh token" });
  }
};
