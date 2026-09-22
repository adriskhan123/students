import express from "express";
import projectsmodels from "../models/projects.models.js";
import upload from "../middleware/upload.js";

const route = express.Router();

route.post("/createproject", upload.single("image"), async (req, res) => {
  try {
    const data = await projectsmodels.create({
      Projectname: req.body.Projectname,
      coustomername: req.body.coustomername,
      notes: req.body.notes,
      imageurl: req.file ? req.file.path : "",
    });

    return res.json({
      success: true,
      msg: "Project created successfully",
      data: data,
    });
  } catch (error) {
    console.log("Create project error:", error);

    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

route.get("/projectsfind", async (req, res) => {
  try {
    const projectdata = await projectsmodels.find();

    return res.json({
      success: true,
      msg: "Projects found",
      data: projectdata,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

route.post("/projectsfindone", async (req, res) => {
  try {
    const projectdata = await projectsmodels.findOne({
      _id: req.body.id,
    });

    if (!projectdata) {
      return res.json({
        success: false,
        msg: "Project not found",
      });
    }

    return res.json({
      success: true,
      msg: "Project found",
      data: projectdata,
    });
  } catch (error) {
    console.log("Find project error:", error);

    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});




route.post("/projectdelete", async (req, res) => {
  try {
    const deleted = await projectsmodels.findOneAndDelete({
      Projectname: req.body.Projectname,
    });

    if (!deleted) {
      return res.json({
        success: false,
        msg: "Project not found",
      });
    }

    return res.json({
      success: true,
      msg: "Project deleted successfully",
      data: deleted,
    });
  } catch (error) {
    console.log("Delete error:", error);

    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

route.post("/projectupdate", async (req, res) => {
  try {
    const data = await projectsmodels.findOneAndUpdate(
      {
        Projectname: req.body.oldProjectname,
      },
      {
        Projectname: req.body.Projectname,
        coustomername: req.body.coustomername,
        notes: req.body.notes,
      },
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!data) {
      return res.json({
        success: false,
        msg: "Project not found",
      });
    }

    return res.json({
      success: true,
      msg: "Project updated successfully",
      data: data,
    });
  } catch (error) {
    console.log("Update error:", error);

    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});

export default route;