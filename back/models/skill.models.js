import mongoose from "mongoose";

const skillSchema = new mongoose.Schema(
  {
    // The user who created this profile (taken from the login cookie)
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      index: true,
    },
    name: { type: String, required: true },
    skill: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String, required: true },
    experience: { type: String, required: true },
    phone: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    available: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const skillModel =
  mongoose.models.Skill || mongoose.model("Skill", skillSchema);

export default skillModel;