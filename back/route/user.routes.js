
import express from "express";
import usermodels from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dpconnection from "../dp/dpconnection.js";

const route = express.Router();

const JWT_SECRET = "123";

// ================= REGISTER =================

route.post("/userdata", async (req, res) => {
  try {
    await dpconnection();

    const { email, name, role, password } = req.body;

    if (!email || !name || !role || !password) {
      return res.status(400).json({
        success: false,
        msg: "All fields are required",
      });
    }

    const existingUser = await usermodels.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        msg: "Email already registered",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await usermodels.create({
      email,
      name,
      role,
      password: hashpassword,
    });

    const tokenData = {
      id: newUser._id,
      role: newUser.role,
    };

    const token = jwt.sign(tokenData, JWT_SECRET);

    res.cookie("stc-operator", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      success: true,
      msg: "User registered successfully",
      data: newUser,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: "User registration failed",
      error: error.message,
    });
  }
});


// ================= LOGIN =================

route.post("/signupdata", async (req, res) => {
  try {
    await dpconnection();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Email and password are required",
      });
    }

    const userData = await usermodels.findOne({ email });

    if (!userData) {
      return res.json({
        success: false,
        msg: "Email not found",
      });
    }

    const result = await bcrypt.compare(
      password,
      userData.password
    );

    if (!result) {
      return res.json({
        success: false,
        msg: "Password is incorrect",
      });
    }

    // Create token
    const tokenData = {
      id: userData._id,
      role: userData.role,
    };

    const token = jwt.sign(tokenData, JWT_SECRET);

    console.log("Login token created");

    res.cookie("stc-operator", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      success: true,
      msg: "You are logged in",
      role: userData.role,
    });

  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});


// ================= ADMIN CHECK =================

route.get("/adincheck", async (req, res) => {
  try {
    await dpconnection();

    const token = req.cookies?.["stc-operator"];

    if (!token) {
      return res.json({
        success: false,
        msg: "Token not found. Not authenticated",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "Admin") {
      return res.json({
        success: false,
        msg: "Only admin allowed",
      });
    }

    return res.json({
      success: true,
      msg: "Admin verified",
      data: decoded,
    });

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      msg: "Invalid token",
    });
  }
});


// ================= USER CHECK =================

route.get("/usecheck", async (req, res) => {
  try {
    await dpconnection();

    const token = req.cookies?.["stc-operator"];

    if (!token) {
      return res.json({
        success: false,
        msg: "Token not found. Not authenticated",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== "user") {
      return res.json({
        success: false,
        msg: "Only users allowed",
      });
    }

    return res.json({
      success: true,
      msg: "User verified",
      data: decoded,
    });

  } catch (error) {
    console.log(error);

    return res.status(401).json({
      success: false,
      msg: "Invalid token",
    });
  }
});


export default route;
