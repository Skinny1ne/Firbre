const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Example fibre coverage data (Durban)
const coverageData = [
  { isp: "Vumatel", lat: -29.8587, lon: 31.0218, available: true },
  { isp: "Openserve", lat: -29.8600, lon: 31.0250, available: true }
];

// Downtime info (Downdetector simplified)
const downtimeData = [
  { isp: "Telkom", status: "No major issues", source: "https://downdetector.co.za/status/telkom/" },
  { isp: "MTN", status: "Minor issues reported", source: "https://downdetector.co.za/status/MTN/" }
];

// Routes

// Get coverage
app.get("/api/coverage", (req, res) => {
  res.json(coverageData);
});

// Get downtime
app.get("/api/downtime", (req, res) => {
  res.json(downtimeData);
});

// Start server
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
