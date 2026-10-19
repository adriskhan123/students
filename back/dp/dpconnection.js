
import mongoose from "mongoose";

const dpconnection = async () => {
  try {
    const MONGO_URI =
      "mongodb+srv://khanadyan144_db_user:EUtntrdkLqq9NLWM@cluster0.idvtyo8.mongodb.net/adyan?retryWrites=true&w=majority";

    await mongoose.connect(MONGO_URI);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    throw error;
  }
};

export default dpconnection;
