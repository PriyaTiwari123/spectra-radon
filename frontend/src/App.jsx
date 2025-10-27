//App.jsx
import { useEffect, useState } from "react";
import { getSensorData, getWeatherData } from "./api/apiClient";


function App() {
  const [sensorData, setSensorData] = useState(null);
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    // Fetch sensor data
    getSensorData()
      .then((data) => {
        console.log("Backend responded:", data);
        setSensorData(data);
      })
      .catch((err) => console.error("Backend error:", err));

    // Fetch weather data
    getWeatherData()
      .then((result) => {
        console.log("Weather data:", result);
        if (result.success) {
          setWeather(result);
        }
      })
      .catch((err) => console.error("Weather error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h1>Spectra Radon Dashboard</h1>
        <div>

    </div>
      {/* Weather Display */}
      {weather && (
        <div style={{ 
          background: "linear-gradient(135deg, #74b9ff, #0984e3)",
          color: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          display: "inline-block"
        }}>
          <h3 style={{ margin: "0 0 10px 0" }}>{weather.location} Weather</h3>
          <div style={{ fontSize: "2em", fontWeight: "bold" }}>
            {weather.temperature}°C
          </div>
          <div>{weather.condition}</div>
        </div>
      )}

      {/* Sensor Data */}
      <div style={{ marginTop: "20px" }}>
        <h3>Sensor Data</h3>
        {sensorData ? (
          <pre>{JSON.stringify(sensorData, null, 2)}</pre>
        ) : (
          <p>Loading sensor data...</p>
        )}
      </div>
    </div>
  );
}

export default App;