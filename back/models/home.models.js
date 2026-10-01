import mongoose from "mongoose";

const homeSchema = new mongoose.Schema({
  skillneed: String,
  worktitle: String,
  city: String,
  area: String,
  BudgePayment: String,
  WhatsAppPhoneNumber: String,
  DetailedDescription: String,
});

const homemodels = mongoose.model("home", homeSchema);

export default homemodels;