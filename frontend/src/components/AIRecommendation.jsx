import { useEffect, useState } from "react";
import { getAIRecommendation, getWeatherData } from "../api/apiClient";

export default function AIRecommendation() {
  const [aiData, setAiData] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Run both fetches concurrently
        const [weatherResult, aiResult] = await Promise.all([
          getWeatherData().catch((err) => {
            console.error("Weather fetch error:", err);
            return null;
          }),
          getAIRecommendation().catch((err) => {
            console.error("AI fetch error:", err);
            return null;
          }),
        ]);

        if (weatherResult?.success) setWeather(weatherResult);
        if (aiResult) setAiData(aiResult);
      } catch (err) {
        console.error("Unexpected fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div
      style={{
        background: "#f8f9fb",
        borderRadius: "10px",
        padding: "20px",
        boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
      }}
    >
      <h3 style={{ margin: 0 }}>AI Recommendation</h3>
      <p style={{ color: "#555", marginTop: "5px" }}>
        Based on current weather and pressure data
      </p>

      {loading && <p>Loading AI model prediction...</p>}

      {!loading && aiData ? (
        <div style={{ marginTop: "10px" }}>
          <p>
            Recommended Fan Speed:{" "}
            <strong>{Math.round(aiData.recommendedSpeed)}%</strong>
          </p>
          <p>
            Action:{" "}
            <strong
              style={{
                color: aiData.action === "TURN_ON" ? "green" : "gray",
              }}
            >
            {aiData.action === "TURN_ON"
              ? "Turn on"
              : aiData.action === "TURN_OFF"
              ? "Turn off"
              : aiData.action}
            </strong>
          </p>
          <small style={{ color: "#666" }}>
            (Temperature: {weather?.temperature ?? "N/A"}°C, Humidity:{" "}
            {weather?.humidity ?? "N/A"}%, Pressure: {aiData.pressure ?? "N/A"} hPa)
          </small>
        </div>
      ) : (
        !loading && <p>Could not fetch AI data.</p>
      )}
    </div>
  );
}
