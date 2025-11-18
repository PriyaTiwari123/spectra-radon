# **Smart Mitigation - Intelligent Radon Mitigation with Adaptive Control**

Smart radon mitigation MVP with AI recommendations, weather API integration, and a React frontend for monitoring.

---

## Requirements

- Node.js **v22**
- WeatherAPI.com key (for backend)

---

## Environment Variables

Create a `.env` file in the `backend` folder:

```
PORT=5000
WEATHER_API_KEY=your_api_key_here

```

Get a free API key from [WeatherAPI.com](https://www.weatherapi.com/).

---

## How to Run Locally

### 1. Clone the repo

```bash
git clone https://github.com/PriyaTiwari123/spectra-radon.git
cd spectra-radon

```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev            # Runs on localhost:5000

```

### 3. Start the frontend

```bash
cd ../frontend
npm install
npm run dev            # Runs on localhost:5173

```
