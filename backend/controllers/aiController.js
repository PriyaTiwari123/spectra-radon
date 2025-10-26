// controllers/aiController.js
export const getAIRecommendation = (req, res) => {
  // Mock simple AI logic
  const temperature = 22.5;
  const pressure = 1013;
  const recommendedSpeed = temperature > 24 ? 80 : 60;

  res.json({
    recommendedSpeed,
    note: "Mock recommendation based on temperature and pressure",
  });
};