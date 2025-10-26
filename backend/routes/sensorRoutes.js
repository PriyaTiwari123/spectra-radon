// routes/sensorRoutes.js
import express from "express";
import { getSensorData } from "../controllers/sensorController.js";

const router = express.Router();
router.get("/", getSensorData);
export default router;
