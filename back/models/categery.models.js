import mongoose from "mongoose";

let categerySchema = mongoose.Schema({
  name: String,
  Slug: String,
  ParentCategory: String,
  CategoryDescription: String,
  CategoryImageURL: String,
  sportoder: Number,
  ImageURL:String
});

let categerymodels = mongoose.model("categery", categerySchema);

export default categerymodels;