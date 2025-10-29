// App.jsx
import { useEffect, useState } from "react";
import { getSensorData, getWeatherData } from "./api/apiClient";
import AIRecommendation from "./components/AIRecommendation"; // ✅ new import
import TopBar from "./components/TopBar";
import SideBar from "./components/SideBar";
import DashboardScreen from "./components/DashboardScreen";
import FanControlScreen from "./components/FanControlScreen";


function App() {
  const [sensorData, setSensorData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [activeScreen, setActiveScreen] = useState("dashboard");

  function renderScreen() {
    switch (activeScreen) {
      case "dashboard":
        return <DashboardScreen />;
      case "control":
        return <FanControlScreen />;
      default:
        return <DashboardScreen />;
    }
  }

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
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <TopBar />
      <div style={{ display: "flex", flex: 1 }}>
        <SideBar activeScreen={activeScreen} setActiveScreen={setActiveScreen} />
        <main style={{ flex: 1, padding: "20px", overflowY: "auto" }}>
          {renderScreen()}
        </main>

      {/* Weather Display */}
      {/* {weather && (
        <div
          style={{
            background: "linear-gradient(135deg, #74b9ff, #0984e3)",
            color: "white",
            padding: "20px",
            borderRadius: "10px",
            marginBottom: "20px",
            display: "inline-block",
          }}
        >
          <h3 style={{ margin: "0 0 10px 0" }}>{weather.location} Weather</h3>
          <div style={{ fontSize: "2em", fontWeight: "bold" }}>
            {weather.temperature}°C
          </div>
          <div>{weather.condition}</div>
        </div>
      )} */}

      {/* Sensor Data */}
      {/* <div style={{ marginTop: "20px" }}>
        <h3>Sensor Data</h3>
        {sensorData ? (
          <pre>{JSON.stringify(sensorData, null, 2)}</pre>
        ) : (
          <p>Loading sensor data...</p>
        )}
      </div> */}

      {/*  AI Recommendation Card */}
      {/* <div style={{ marginTop: "30px" }}>
        <AIRecommendation />
      </div>*/}
    </div> 
    </div>
  );
}

export default App;