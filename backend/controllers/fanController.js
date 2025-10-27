// backend/controllers/fanController.js

export const turnFanOn = (req, res) => {
  try {
    res.json({ success: true, fanState: "ON" });
  } catch (err) {
    console.error("Fan ON error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const turnFanOff = (req, res) => {
  try {
    res.json({ success: true, fanState: "OFF" });
  } catch (err) {
    console.error("Fan OFF error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

export const setFanSpeed = (req, res) => {
  try {
    const { speed } = req.body;
    if (typeof speed !== "number" || speed < 0 || speed > 100) {
      throw new Error("Invalid speed value. Must be between 0–100.");
    }
    res.json({ success: true, fanSpeed: speed });
  } catch (err) {
    console.error("Fan speed error:", err);
    res.status(400).json({ success: false, error: err.message });
  }
};