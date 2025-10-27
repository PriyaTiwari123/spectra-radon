// controllers/sensorController.js
import { fetchSensorData } from "../services/deviceService.js";

export const getSensorData = (req, res) => {
  try {
    const data = fetchSensorData();
    res.json({ success: true, ...data });
  } catch (err) {
    console.error("Sensor data fetch error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "Failed to fetch sensor data",
    });
  }
};