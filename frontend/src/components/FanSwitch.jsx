//components/FanSwitch.jsx

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../components/Card";
import { turnFanOn, turnFanOff } from "../api/apiClient";
import * as SwitchPrimitive from "@radix-ui/react-switch";

function Switch({ checked, onCheckedChange }) {
  return (
    <SwitchPrimitive.Root
      checked={checked}
      onCheckedChange={onCheckedChange}
      style={{
        width: "40px",
        height: "22px",
        borderRadius: "9999px",
        backgroundColor: checked ? "#4ade80" : "#e5e7eb",
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        position: "relative",
        outline: "none",
        border: "none",
        boxShadow: "none",
        WebkitTapHighlightColor: "transparent",
      }}
    >
      <SwitchPrimitive.Thumb
        data-state={checked ? "checked" : "unchecked"}
        style={{
          width: "18px",
          height: "18px",
          borderRadius: "9999px",
          backgroundColor: "#fff",
          position: "absolute",
          top: "2px",
          left: checked ? "20px" : "2px",
          transition: "left 0.2s ease",
        }}
      />
    </SwitchPrimitive.Root>
  );
}

export default function FanSwitch() {
  const [fanEnabled, setFanEnabled] = useState(() => {
    const saved = localStorage.getItem("fanEnabled");
    return saved !== null ? JSON.parse(saved) : false;
  });

  const handleToggle = async (checked) => {
      setFanEnabled(checked); 
      localStorage.setItem("fanEnabled", JSON.stringify(checked));
      
      try {
        if (checked) {
          await turnFanOn();
        } else {
          await turnFanOff();
        }
      } catch (err) {
        console.error("Failed to toggle fan:", err);
        setFanEnabled(!checked); 
        localStorage.setItem("fanEnabled", JSON.stringify(!checked));
      }
    };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Power Control</CardTitle>
        <CardDescription>Turn your radon fan on or off</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div>
              <p className="text-sm text-slate-500">
                {fanEnabled ? "Running" : "Stopped"}
              </p>
            </div>
          </div>
          <Switch
            checked={fanEnabled}
            onCheckedChange={handleToggle}
          />
          </div>
        <div/>
      </CardContent>
    </Card>
  );
}
