// services/deviceService.js
export const fetchSensorData = () => {
  return {
    temperature: 22.5,
    pressure: 1013,
    timestamp: new Date().toISOString(),
  };
};