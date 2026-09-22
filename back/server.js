import express from "express";
import cors from "cors";
import dpconnection from "./dp/dpconnection.js";
import categeryRoutes from "./routes/categery.routes.js";

const app = express();

app.use(cors());

app.use(express.json());

dpconnection();

app.use("/categery", categeryRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

