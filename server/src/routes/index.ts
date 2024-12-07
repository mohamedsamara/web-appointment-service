import { Router } from "express";
import apiRoutes from "./api";

const router = Router();

router.use("/api", apiRoutes);

// Health check endpoint
router.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Service is healthy and running." });
});
router.use("/api", (req, res) => res.status(404).json("No API route found"));

export default router;
