
import express from "express";
import cors from "cors";
import dpconnection from "./dp/dpconnection.js";
import homeroutes from "./route/home.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import userroute from "./route/user.routes.js";

dotenv.config();

const app = express();

// ================= CORS =================

app.use(
  cors({
    origin: process.env.frontend_url,
    credentials: true,
  })
);

// ================= MIDDLEWARE =================

app.use(cookieParser());
app.use(express.json());

// ================= DATABASE =================

dpconnection();

// ================= ROUTES =================

app.use("/user", userroute);
app.use("/home", homeroutes);

// ================= SERVER =================

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running on port 3000");
});

