import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
  Projectname: String,
  coustomername: String,
  notes: String,
  imageurl: String,
});

const projectmodels = mongoose.model("project", projectSchema);

export default projectmodels;