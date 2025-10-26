// routes/aiRoutes.js
import express from "express";
import { getAIRecommendation } from "../controllers/aiController.js";

const router = express.Router();
router.get("/recommendation", getAIRecommendation);
export default router;