// src/components/WeatherTest.jsx
import { fetchCurrentTemperature } from '../services/weatherService';

const WeatherTest = () => {
  const testWeatherService = async () => {
    console.log('Testing weather service...');
    console.log('API Key exists:', !!import.meta.env.VITE_WEATHER_API_KEY);
    
    const result = await fetchCurrentTemperature();
    console.log('Weather result:', result);
  };

  return (
    <div>
      <button onClick={testWeatherService}>Test Weather Service</button>
    </div>
  );
};

export default WeatherTest;