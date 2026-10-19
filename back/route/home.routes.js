import express from "express";
import homemodels from "../models/home.models.js";
import requireAuth from "../middleware/auth.js";

const router = express.Router();

// Create a job (any logged-in user, normal or admin)
router.post("/create", requireAuth, async (req, res) => {
  try {
    const {
      skillneed,
      worktitle,
      city,
      area,
      BudgePayment,
      WhatsAppPhoneNumber,
      DetailedDescription,
    } = req.body;

    const response = await homemodels.create({
      skillneed,
      worktitle,
      city,
      area,
      BudgePayment,
      WhatsAppPhoneNumber,
      DetailedDescription,
      owner: req.user.id, // always from the login cookie, never from the body
    });

    res.status(201).json({
      success: true,
      msg: "Job posted successfully",
      data: response,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      msg: "Could not post the job. Please check all required fields.",
      error: error.message,
    });
  }
});

// All jobs (any logged-in user can see this list)
router.get("/all", requireAuth, async (req, res) => {
  try {
    const response = await homemodels.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      msg: "Jobs found",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to load jobs",
      error: error.message,
    });
  }
});

// Only the jobs I posted
router.get("/mine", requireAuth, async (req, res) => {
  try {
    const response = await homemodels
      .find({ owner: req.user.id })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      msg: "Your jobs found",
      data: response,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to load your jobs",
      error: error.message,
    });
  }
});

// Delete a job (owner, or an admin)
router.delete("/delete/:id", requireAuth, async (req, res) => {
  try {
    const filter =
      req.user.role === "admin"
        ? { _id: req.params.id }
        : { _id: req.params.id, owner: req.user.id };

    const response = await homemodels.findOneAndDelete(filter);

    if (!response) {
      return res.status(404).json({
        success: false,
        msg: "Job not found",
      });
    }

    res.json({
      success: true,
      msg: "Job deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Failed to delete job",
      error: error.message,
    });
  }
});

export default router;