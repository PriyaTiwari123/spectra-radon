// routes/fanRoutes.js
import express from "express";
import { turnFanOn, turnFanOff, setFanSpeed } from "../controllers/fanController.js";

const router = express.Router();

router.post("/on", turnFanOn);
router.post("/off", turnFanOff);
router.post("/speed", setFanSpeed);

export default router;