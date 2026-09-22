import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: String,
  email: String,
  fatherName: String,
  className: String,
  phone: String,
  address: String,
  imageurl: String,
});

const studentmodels = mongoose.model("Student", studentSchema);

export default studentmodels;