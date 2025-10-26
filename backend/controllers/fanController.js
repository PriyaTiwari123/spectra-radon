// controllers/fanController.js
export const turnFanOn = (req, res) => {
  res.json({ fanState: "ON" });
};

export const turnFanOff = (req, res) => {
  res.json({ fanState: "OFF" });
};

export const setFanSpeed = (req, res) => {
  const { speed } = req.body;
  res.json({ fanSpeed: speed });
};
