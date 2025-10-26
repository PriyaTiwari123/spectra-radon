// controllers/sensorController.js
import { fetchSensorData } from "../services/deviceService.js";

export const getSensorData = (req, res) => {
  const data = fetchSensorData();
  res.json(data);
};