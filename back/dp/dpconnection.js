import mongoose from "mongoose";




const dpconnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/users");
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};



export default dpconnection;