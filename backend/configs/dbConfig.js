import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongourl = process.env.MONGO_URL;

const dbConnect = async () => {
  try {
    await mongoose.connect(mongourl);
    console.log("✅ Database connection successful");
  } catch (error) {
    console.log(`❌ Database connection error: ${error}`);
  }
};
export { dbConnect };
