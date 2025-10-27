import axios from "axios";

// Axios instance configured with backend URL
const api = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL || "http://localhost:5050",
});

// -------- SENSOR ENDPOINTS --------
export const getSensorData = async () => {
  const response = await api.get("/sensor");
  return response.data;
};

// -------- FAN CONTROL ENDPOINTS --------
export const turnFanOn = async () => api.post("/fan/on");
export const turnFanOff = async () => api.post("/fan/off");
export const setFanSpeed = async (speed) => api.post("/fan/speed", { speed });

// -------- AI RECOMMENDATION --------
export const getAIRecommendation = async () => {
  const response = await api.get("/ai/recommendation");
  return response.data;
};

// -------- WEATHER API --------
export const getWeatherData = async () => {
  const response = await api.get("/weather"); 
  return response.data;
};



export default api;