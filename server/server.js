import express from "express";
import cors from "cors"

import connectDB from "./src/config/connectDB.js";
import env from "./src/config/env.js";
import authRoute from "./src/routes/auth.routes.js";


const app = express();
app.use(cors({
  origin: "http://localhost:3000/", // ⚠️ change this in production
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());
app.use("/api/auth", authRoute);
app.get("/", async (req, res) => {
  try {
    return res.status(200).json({
      message: "Server started / Auth Route",
      success: true,
    });
  } catch (error) {
    console.log("error \t" + error.message);
    return res.status(500).json({
      message: "Server Error",
      success: false,
    });
  }
});

app.listen(env.PORT, () => {
  connectDB();
  console.log(`Server is running at http://localhost:${env.PORT}`);
});
