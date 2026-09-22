import mongoose from "mongoose";

async function dpconnection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/project");
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.log("MONGODB CONNECTION ERROR:", error);
  }
}

export default dpconnection;