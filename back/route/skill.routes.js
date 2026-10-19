
import express from "express";
import skillmodels from "../models/skill.models.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// Create Skill
router.post("/askillcreate", (req, res) => {
  upload.single("image")(req, res, async (uploadError) => {
    if (uploadError) {
      console.error("Image upload error:", uploadError);
      return res.status(500).json({
        success: false,
        message: uploadError.message || "Image upload failed",
      });
    }

    try {
      console.log("Creating skill profile...");
      console.log("Received fields:", Object.keys(req.body || {}));
      console.log("Image uploaded:", Boolean(req.file));

      const skillData = {
        name: req.body.name,
        skill: req.body.skill,
        city: req.body.city,
        area: req.body.area || "",
        experience:
          req.body.experience === "" || req.body.experience == null
            ? undefined
            : Number(req.body.experience),
        phone: req.body.phone,
        description: req.body.description || "",
        image: req.file?.path || "",
        available:
          req.body.available === true ||
          req.body.available === "true",
      };

      const response = await skillmodels.create(skillData);

      return res.status(201).json({
        success: true,
        message: "Skill created successfully",
        data: response,
      });
    } catch (error) {
      console.error("Create skill error:", error);

      return res.status(500).json({
        success: false,
        message: error.message || "Skill creation failed",
      });
    }
  });
});

// Find All Skills
router.get("/skillfind", async (req, res) => {
  try {
    const response = await skillmodels.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Skills found",
      data: response,
    });
  } catch (error) {
    console.error("Find skills error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to find skills",
    });
  }
});

// Find One Skill
router.get("/skillfindone/:id", async (req, res) => {
  try {
    const response = await skillmodels.findById(req.params.id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill found",
      data: response,
    });
  } catch (error) {
    console.error("Find one skill error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to find skill",
    });
  }
});

// Find My Skills
router.get("/myskills", async (req, res) => {
  try {
    const response = await skillmodels.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      message: "Skills found",
      data: response,
    });
  } catch (error) {
    console.error("Find my skills error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to find skills",
    });
  }
});

// Update Skill
router.put("/skillupdate/:id", async (req, res) => {
  try {
    const { owner, ...updates } = req.body;

    const response = await skillmodels.findByIdAndUpdate(
      req.params.id,
      updates,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill updated successfully",
      data: response,
    });
  } catch (error) {
    console.error("Update skill error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to update skill",
    });
  }
});

// Delete Skill
router.delete("/skilldelete/:id", async (req, res) => {
  try {
    const response = await skillmodels.findByIdAndDelete(req.params.id);

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Skill not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Skill deleted successfully",
      data: response,
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    return res.status(500).json({
      success: false,
      message: error.message || "Failed to delete skill",
    });
  }
});

export default router;

