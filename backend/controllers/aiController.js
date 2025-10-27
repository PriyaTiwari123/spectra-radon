// backend/controllers/aiController.js
import * as tf from "@tensorflow/tfjs-node";
import { fetchSensorData } from "../services/deviceService.js";

export const getAIRecommendation = async (req, res) => {
  try {
    const { temperature, pressure } = fetchSensorData();

    const rawInputs = [
      [18, 1015],
      [20, 1013],
      [22, 1012],
      [24, 1010],
      [26, 1008],
      [28, 1005],
      [30, 1003],
    ];
    const rawOutputs = [[25], [35], [45], [55], [65], [75], [85]];

    // Normalize data
    const tempMean = 24;
    const tempStd = 4;
    const pressMean = 1010;
    const pressStd = 5;

    const normalize = (t, p) => [(t - tempMean) / tempStd, (p - pressMean) / pressStd];

    const normalizedInputs = rawInputs.map(([t, p]) => normalize(t, p));
    const trainingInputs = tf.tensor2d(normalizedInputs);
    const trainingOutputs = tf.tensor2d(rawOutputs);

    const model = tf.sequential();
    model.add(tf.layers.dense({ inputShape: [2], units: 8, activation: "relu" }));
    model.add(tf.layers.dense({ units: 1 }));
    model.compile({ optimizer: tf.train.adam(0.01), loss: "meanSquaredError" });

    // Train model
    await model.fit(trainingInputs, trainingOutputs, { epochs: 200, verbose: 0 });

    const [normTemp, normPress] = normalize(temperature, pressure);
    const inputTensor = tf.tensor2d([[normTemp, normPress]]);
    const predictionTensor = model.predict(inputTensor);
    const predictedSpeed = (await predictionTensor.data())[0];

    console.log(
      `Predicted Speed: ${predictedSpeed.toFixed(2)} | Temp: ${temperature}°C | Pressure: ${pressure}`
    );

    const action = predictedSpeed > 40 ? "TURN_ON" : "TURN_OFF";

    res.json({
      success: true,
      temperature,
      pressure,
      recommendedSpeed: Math.round(predictedSpeed),
      action,
      note: "Predicted using normalized data",
    });
  } catch (err) {
    console.error("AI Recommendation error:", err);
    res.status(500).json({
      success: false,
      error: err.message || "AI model computation failed",
    });
  }
};
