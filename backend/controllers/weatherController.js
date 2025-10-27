//weatherController.js
import { fetchWeatherData } from '../services/weatherService.js';

export const getWeatherData = async (req, res) => {
  try {
    const weather = await fetchWeatherData();
    res.json(weather);
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      error: error.message 
    });
  }
};