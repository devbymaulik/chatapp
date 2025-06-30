import {
  getAllUser,
  logout,
  signin,
  signup,
  refreshToken,
  updateUser,
} from "../controllers/userController.js";
import express from "express";
import { authVerification } from "../middelwares/authVarification.js";
import { uploadAvatar } from "../middelwares/uploadAvatar.js";
const userRouter = express.Router();
// Signup and Signin
userRouter.post("/signup", signup);
userRouter.post("/signin", signin);
// Logout (requires user to be logged in)
userRouter.post("/logout", authVerification, logout);
// Refresh token (should NOT use authVerification)
userRouter.get("/refreshToken", refreshToken);
// Get all users (protected route)
userRouter.get("/getUsers", authVerification, getAllUser);
userRouter.post(
  "/updateUser",
  authVerification,
  uploadAvatar.single("avatar"),
  updateUser
);
export default userRouter;
