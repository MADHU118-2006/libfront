import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reservationRoutes from "./routes/reservationRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import adminDashboardRoutes from "./routes/adminDashboardRoutes.js";
import cloudRoutes from "./routes/cloudRoutes.js";





dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/cloud", cloudRoutes);


app.use("/api/reservations", reservationRoutes);

// MongoDB Atlas Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("🌎 MongoDB Atlas Connected"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
