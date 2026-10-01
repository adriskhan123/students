import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  email: String,
  password: String,
  name: String,
  fatherName: String,
  phone: Number,
  age: Number,
  address: String,
  city: String,
  role: String, 
});

const usermodels = mongoose.model("user", userSchema);

export default usermodels;