import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    fatherName: {
      type: String,
      trim: true,
    },

    phone: {
      type: String,
      trim: true,
    },

    age: {
      type: Number,
    },

    address: {
      type: String,
      trim: true,
    },

    city: {
      type: String,
      trim: true,
    },

    role: {
      type: String,
      enum: ["worker", "customer", "admin"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

const usermodels =
  mongoose.models.user || mongoose.model("user", userSchema);

export default usermodels;