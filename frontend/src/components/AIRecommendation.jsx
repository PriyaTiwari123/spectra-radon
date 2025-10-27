import { useEffect, useState } from "react";
import { getAIRecommendation } from "../api/apiClient";

export default function AIRecommendation() {
  const [aiData, setAiData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAI = async () => {
      try {
        const data = await getAIRecommendation();
        setAiData(data);
      } catch (err) {
        console.error("Error fetching AI data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAI();
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

      {!loading && aiData && (
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
              {aiData.action}
            </strong>
          </p>
          <small style={{ color: "#666" }}>
            (Temperature: {aiData.temperature}°C, Pressure: {aiData.pressure} hPa)
          </small>
        </div>
      )}

      {!loading && !aiData && <p>Could not fetch AI data.</p>}
    </div>
  );
}
