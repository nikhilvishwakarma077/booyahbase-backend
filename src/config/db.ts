import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log("MongoDB Connected...");
  } catch (error) {
    console.error("DB Connection Error:", error);
    process.exit(1);
  }
}; 