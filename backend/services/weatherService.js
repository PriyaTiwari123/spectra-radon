// backend/services/weatherService.js
import fetch from 'node-fetch'; // install node-fetch if Node < 18

const API_KEY = process.env.WEATHER_API_KEY;
const BASE_URL = 'http://api.weatherapi.com/v1';

export const fetchWeatherData = async () => {
  if (!API_KEY) {
    console.error('Weather API key missing (process.env.WEATHER_API_KEY)');
    return { success: false, error: 'API key missing on backend' };
  }
  try {
    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=Calgary,AB&aqi=no`;
    console.log('Fetching weather:', url);
    const response = await fetch(url);
    if (!response.ok) {
      const text = await response.text();
      throw new Error(`HTTP ${response.status} - ${text}`);
    }
    const data = await response.json();
    return {
      temperature: data.current.temp_c,
      condition: data.current.condition.text,
      location: data.location?.name || 'Unknown',
      success: true
    };
  } catch (err) {
    console.error('Weather fetch error:', err);
    return { success: false, error: err.message };
  }
};
