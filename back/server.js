import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import dpconnection from "./dp/dpconnection.js";
import userRoute from "./route/user.routes.js";
import skillRoute from "./route/skill.routes.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/user", userRoute);
app.use("/skill", skillRoute);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  await dpconnection();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer().catch((error) => {
  console.error("Server startup failed:", error.message);
  process.exitCode = 1;
});