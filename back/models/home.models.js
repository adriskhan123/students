import mongoose from "mongoose";

const homeSchema = new mongoose.Schema(
  {
    // The logged-in user who posted this job (set from the login cookie)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: true,
    },
    skillneed: { type: String, required: true, trim: true },
    worktitle: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    area: { type: String, required: true, trim: true },
    BudgePayment: { type: String, trim: true },
    WhatsAppPhoneNumber: { type: String, required: true, trim: true },
    DetailedDescription: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const homemodels =
  mongoose.models.home || mongoose.model("home", homeSchema);

export default homemodels;