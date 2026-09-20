import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/db.js";
import cors from "cors";

import adminRoutes from "./routes/admin.route.js";
import organizerRoutes from "./routes/organizer.routes.js";
import scrimRoutes from "./routes/scrim.routes.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express()

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin:process.env.CLIENT_URL,
  // origin:"http://localhost:5173",
  credentials: true
}));
connectDB();

app.get("/", (req, res) => {
  res.json({
    message: "API Running"
  });
});

app.use("/api/admin", adminRoutes);
app.use("/api/organizers", organizerRoutes);
app.use("/api/scrims", scrimRoutes);

app.use(notFound);
app.use(errorHandler); 



 
export default app; 