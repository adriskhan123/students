import express from "express";
import usermodels from "../models/user.models.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const route = express.Router();

// REGISTER//
route.post("/userdata", async (req, res) => {
  try {
    const data = req.body;

    const hashpassword = await bcrypt.hash(data.password, 10);

    const newUser = await usermodels.create({
      email: data.email,
      name: data.name,
      role: data.role,
      password: hashpassword,
    });

    let tokenData = {
      id: newUser._id,
      role: newUser.role,
    };

    let token = jwt.sign(tokenData, "123");

    console.log(token, "The token is here.");

    res.cookie("stc-operator", token);

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


// LOGIN
route.post("/signupdata", async (req, res) => {
  try {
    const { email, password } = req.body;

    const userData = await usermodels.findOne({
      email: email,
    });

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

    if (result === false) {
      return res.json({
        success: false,
        msg: "Password is incorrect",
      });
    }

    

    // Create token//
    // let tokenData = {
    //   id: userData._id,
    //   role: userData.role,
    // };

    // let token = jwt.sign(tokenData, "123");

    // console.log(token, "The token is here.");

    // res.cookie("stc-operator", token);

    // return res.json({
    //   success: true,
    //   msg: "You are login",
    //   role: userData.role,
    // });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message,
    });
  }
});


// ADMIN CHECK
route.get("/adincheck", (req, res) => {
  try {

    const token = req.cookies?.["stc-operator"];

    if (!token) {
      return res.json({
        success: false,
        msg: "token not found and Not authenticated",
      });
    }

    const decoded = jwt.verify(token, "123");

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

export default route;