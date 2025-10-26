import { useEffect } from "react";
import { getSensorData } from "./api/apiClient";

function App() {
  useEffect(() => {
    // temporary backend connectivity test
    getSensorData()
      .then((data) => console.log("Backend responded:", data))
      .catch((err) => console.error("Backend error:", err));
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Spectra Radon </h2>
      <p>Frontend connected to backend — check console logs for data.</p>
      <p><em>(Replace this placeholder with the actual frontend code.)</em></p>
    </div>
  );
}

export default App;