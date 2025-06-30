import mongoose from "mongoose";
// Define the schema for users
const usersSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true, // optional: removes extra spaces
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      type: String, // optional
    },
  },
  {
    timestamps: true, // ✅ Adds createdAt & updatedAt fields automatically
  }
);
// Create and export the model
const userModel = mongoose.models.User || mongoose.model("User", usersSchema);
export default userModel;
