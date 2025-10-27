import 'dotenv/config'; 
import express from "express";
import cors from "cors";
import fanRoutes from "./routes/fanRoutes.js";
import sensorRoutes from "./routes/sensorRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js"


const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/fan", fanRoutes);
app.use("/sensor", sensorRoutes);
app.use("/ai", aiRoutes);
app.use("/weather", weatherRoutes)

app.get("/", (req, res) => res.send("Spectra Radon backend running"));

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));