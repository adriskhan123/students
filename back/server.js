
import express from "express";
import cors from "cors";
import dpconnection from "./dp/dpconnection.js";
import userroute from "./route/user.route.js";
import projectsroute from "./route/projects.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import memberroute from "./route/member.route.js";

dotenv.config();

const app = express();

// CORS
app.use(
  cors({
    origin: process.env.frontend_url,
    credentials: true,
  })
);

// Middleware
app.use(cookieParser());
app.use(express.json());

// Database
dpconnection();

// Routes
app.use("/user", userroute);
app.use("/projects", projectsroute);
app.use("/member", memberroute);

// Server
app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});

