//components/FanSpeedSlider.jsx

import { useEffect,useState } from "react";
import { setFanSpeed } from "../api/apiClient";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/Card"; 

export default function FanSpeedSlider() {
  const [speed, setSpeed] = useState(() => {
    const saved = localStorage.getItem("fanSpeed");
    return saved !== null ? JSON.parse(saved) : 0;
  });
  const [pendingSpeed, setPendingSpeed] = useState(null);

  useEffect(() => {
    if (pendingSpeed === null) return;

    const timer = setTimeout(async () => {
      try {
        await setFanSpeed(pendingSpeed);
      } catch (err) {
        console.error("Failed to set fan speed:", err);
      }
    }, 300); 

    return () => clearTimeout(timer);
  }, [pendingSpeed]);

  const handleChange = (e) => {
    const newSpeed = parseInt(e.target.value, 10);
    setSpeed(newSpeed);
    setPendingSpeed(newSpeed);
    localStorage.setItem("fanSpeed", JSON.stringify(newSpeed));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Fan Speed</CardTitle>
        <CardDescription>Adjust the radon fan speed</CardDescription>
      </CardHeader>
      <CardContent>
        <label
          htmlFor="fan-speed"
          style={{ fontWeight: "bold", fontSize: "0.9rem", display: "block" }}
        >
          Speed: {speed}%
        </label>
        <input
          id="fan-speed"
          type="range"
          min="0"
          max="100"
          value={speed}
          onChange={handleChange}
          style={{
            width: "100%",
            marginTop: "0.5rem",
            appearance: "none",
            height: "6px",
            borderRadius: "3px",
            background: "#d1d5db",
            outline: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
        />
        <style>
          {`
            input[type="range"]::-webkit-slider-thumb {
              appearance: none;
              width: 16px;
              height: 16px;
              background: #4ade80;
              border-radius: 50%;
              cursor: pointer;
              border: none;
              box-shadow: none;
            }

            input[type="range"]::-moz-range-thumb {
              width: 16px;
              height: 16px;
              background: #4ade80;
              border-radius: 50%;
              cursor: pointer;
              border: none;
              box-shadow: none;
            }
          `}
        </style>
      </CardContent>
    </Card>
  );
}