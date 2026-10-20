
import express from "express";
import usermodels from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dpconnection from "../dp/dpconnection.js";

const route = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || "123";

// ======================================================
// AUTH MIDDLEWARE
// ======================================================

const authMiddleware = (req, res, next) => {
  try {
    const token = req.cookies?.["stc-operator"];

    if (!token) {
      return res.status(401).json({
        success: false,
        msg: "Not authenticated. Please login.",
      });
    }

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    console.log("AUTH ERROR:", error);

    return res.status(401).json({
      success: false,
      msg: "Invalid or expired token.",
    });
  }
};

// ======================================================
// ADMIN MIDDLEWARE
// ======================================================

const adminMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      msg: "Not authenticated.",
    });
  }

  if (String(req.user.role).toLowerCase() !== "admin") {
    return res.status(403).json({
      success: false,
      msg: "Only admin users are allowed.",
    });
  }

  next();
};

// ======================================================
// CUSTOMER MIDDLEWARE
// ======================================================

const customerMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      msg: "Not authenticated.",
    });
  }

  if (String(req.user.role).toLowerCase() !== "customer") {
    return res.status(403).json({
      success: false,
      msg: "Only customers are allowed.",
    });
  }

  next();
};

// ======================================================
// WORKER MIDDLEWARE
// ======================================================

const workerMiddleware = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      msg: "Not authenticated.",
    });
  }

  if (String(req.user.role).toLowerCase() !== "worker") {
    return res.status(403).json({
      success: false,
      msg: "Only workers are allowed.",
    });
  }

  next();
};

// ======================================================
// REGISTER
// POST /user/userdata
// ======================================================

route.post("/userdata", async (req, res) => {
  try {
    await dpconnection();

    const {
      email,
      password,
      name,
      fatherName,
      phone,
      age,
      address,
      city,
      role,
    } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({
        success: false,
        msg: "Name, email and password are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const existingUser = await usermodels.findOne({
      email: cleanEmail,
    });

    if (existingUser) {
      return res.status(409).json({
        success: false,
        msg: "Email is already registered.",
      });
    }

    const selectedRole = String(role || "customer")
      .trim()
      .toLowerCase();

    if (!["customer", "worker"].includes(selectedRole)) {
      return res.status(400).json({
        success: false,
        msg: "Please select customer or worker.",
      });
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await usermodels.create({
      name: name.trim(),
      fatherName: fatherName?.trim() || "",
      email: cleanEmail,
      phone: phone?.trim() || "",
      age: age || undefined,
      address: address?.trim() || "",
      city: city?.trim() || "",
      password: hashpassword,
      role: selectedRole,
    });

    const token = jwt.sign(
      {
        id: newUser._id,
        role: selectedRole,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("stc-operator", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      msg: "Registration successful.",
      role: selectedRole,
      data: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: selectedRole,
      },
    });
  } catch (error) {
    console.log("REGISTER ERROR:", error);

    return res.status(500).json({
      success: false,
      msg: "User registration failed.",
      error: error.message,
    });
  }
});

// ======================================================
// LOGIN
// POST /user/signupdata
// ======================================================

route.post("/signupdata", async (req, res) => {
  try {
    await dpconnection();

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        msg: "Email and password are required.",
      });
    }

    const cleanEmail = email.trim().toLowerCase();

    const userData = await usermodels.findOne({
      email: cleanEmail,
    });

    if (!userData) {
      return res.status(401).json({
        success: false,
        msg: "Email not found.",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      userData.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        msg: "Password is incorrect.",
      });
    }

    const role = String(userData.role)
      .trim()
      .toLowerCase();

    const token = jwt.sign(
      {
        id: userData._id,
        role,
      },
      JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("stc-operator", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.json({
      success: true,
      msg: "Login successful.",
      role,
      data: {
        id: userData._id,
        name: userData.name,
        email: userData.email,
        role,
      },
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      success: false,
      msg: "Login failed.",
      error: error.message,
    });
  }
});

// ======================================================
// CURRENT USER
// GET /user/me
// ======================================================

route.get("/me", authMiddleware, async (req, res) => {
  try {
    await dpconnection();

    const user = await usermodels
      .findById(req.user.id)
      .select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "User not found.",
      });
    }

    return res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.log("ME ERROR:", error);

    return res.status(500).json({
      success: false,
      msg: "Unable to get user.",
    });
  }
});

// ======================================================
// AUTH CHECK
// GET /user/auth-check
// ======================================================

route.get("/auth-check", authMiddleware, (req, res) => {
  return res.json({
    success: true,
    msg: "Authentication verified.",
    data: req.user,
  });
});

// ======================================================
// ADMIN CHECK
// GET /user/admin-check
// ======================================================

route.get(
  "/admin-check",
  authMiddleware,
  adminMiddleware,
  (req, res) => {
    return res.json({
      success: true,
      msg: "Admin verified.",
      data: req.user,
    });
  }
);

// ======================================================
// CUSTOMER CHECK
// GET /user/customer-check
// ======================================================

route.get(
  "/customer-check",
  authMiddleware,
  customerMiddleware,
  (req, res) => {
    return res.json({
      success: true,
      msg: "Customer verified.",
      data: req.user,
    });
  }
);

// ======================================================
// WORKER CHECK
// GET /user/worker-check
// ======================================================

route.get(
  "/worker-check",
  authMiddleware,
  workerMiddleware,
  (req, res) => {
    return res.json({
      success: true,
      msg: "Worker verified.",
      data: req.user,
    });
  }
);

// ======================================================
// LOGOUT
// POST /user/logout
// ======================================================

route.post("/logout", (req, res) => {
  try {
    res.clearCookie("stc-operator", {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.json({
      success: true,
      msg: "Logout successful.",
    });
  } catch (error) {
    console.log("LOGOUT ERROR:", error);

    return res.status(500).json({
      success: false,
      msg: "Logout failed.",
    });
  }
});

export default route;

