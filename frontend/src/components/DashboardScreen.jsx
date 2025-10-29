//components/DashboardScreen.jsx

import { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "./Card"; 
import { getSensorData, getWeatherData } from "../api/apiClient";
import AIRecommendation from "./AIRecommendation"; 

export default function DashboardScreen() {
  const [sensorData, setSensorData] = useState(null);
  const [weather, setWeather] = useState(null);
  const fanEnabled = JSON.parse(localStorage.getItem("fanEnabled") || "false");
  const fanSpeed = JSON.parse(localStorage.getItem("fanSpeed") || "0");

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
    <div style={{ padding: "20px", maxWidth: "1200px", margin: "0 auto", display: "flex", flexDirection: "column", gap: "30px" }}>
      
      {/* Fan Data*/}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
       }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Fan Status</CardTitle>
          </CardHeader>
          <CardContent>
              <div
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: `2px solid ${fanEnabled ? "#16a34a" : "#6b7280"}`, 
                  backgroundColor: fanEnabled ? "rgba(22, 163, 74, 0.1)" : "rgba(107, 114, 128, 0.1)", 
                  color: fanEnabled ? "#16a34a" : "#6b7280",
                  fontWeight: "500",
                  display: "inline-block",
                  fontSize: "14px",
                }}
              >
                {fanEnabled ? "Running" : "Stopped"}
              </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Fan Speed</CardTitle>
            <CardDescription>
            </CardDescription>
          </CardHeader>
          <CardContent>
            {fanSpeed}%
          </CardContent>
        </Card>

        {/* Sensor Data */}
        <Card>
          <CardHeader>
            <CardTitle>Temperature</CardTitle>
            <CardDescription>
              Current Temperature
            </CardDescription>
          </CardHeader>
          <CardContent>
              {sensorData ? sensorData.temperature : "Loading Sensor Data..."} °C
              
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pressure</CardTitle>
            <CardDescription>
              Current Pressure
            </CardDescription>
          </CardHeader>
          <CardContent>
              {sensorData ? sensorData.pressure : "Loading Sensor Data..."} hPa
          </CardContent>
        </Card>
      </div>

      {/* AI Recommendation Section */}
      <div>
        <AIRecommendation />
      </div>
      
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: "20px",
        }}
        >

    {/* System Diagnostics */}
    <Card style={{ background: "#fff", border: "1px solid #d0d7de", borderRadius: "12px", padding: "16px", boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }}>
      <CardHeader>
        <CardTitle style={{ fontSize: "16px", fontWeight: "600", color: "#0f172b" }}>System Diagnostics</CardTitle>
        <CardDescription style={{ fontSize: "14px", color: "#64748b" }}>Share system information with technicians</CardDescription>
      </CardHeader>
      <CardContent>
        <div style={{ fontSize: "14px", color: "#334155", lineHeight: "1.6", marginBottom: "12px" }}>
          <p><strong>System Uptime:</strong> 1 day</p>
          <p><strong>Last Check:</strong> Just now</p>
          <p><strong>System ID:</strong> RPM-2024-001</p>
        </div>
        <button
          style={{
            padding: "8px 12px",
            backgroundColor: "black",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "14px",
          }}
          onClick={() => alert("Diagnostics shared!")}
        >
          Share Diagnostics
        </button>
      </CardContent>
    </Card>
  </div>
  </div>
  );
}

