// server.js
const express = require('express');
const fetch = require('node-fetch'); // npm install node-fetch@2
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Dummy coverage data (could later integrate with real ISP APIs)
const coverageData = [
  { lat: -29.8587, lon: 31.0218, isp: 'Telkom', coverage: true },
  { lat: -29.8600, lon: 31.0300, isp: 'MTN', coverage: true }
];

// Downtime reviews scraped or dummy
const downtimeReviews = {
  telkom: { lastOutage: '2025-09-20 14:00', downtimeMinutes: 15, userReviews: 4.2 },
  mtn: { lastOutage: '2025-09-19 18:00', downtimeMinutes: 0, userReviews: 3.8 }
};

// Endpoint: GET /api/coverage?lat=&lon=
app.get('/api/coverage', (req, res) => {
  const { lat, lon } = req.query;
  // Return closest coverage point
  const point = coverageData.reduce((prev, curr) => {
    const dPrev = Math.hypot(curr.lat - lat, curr.lon - lon);
    const dCurr = Math.hypot(prev.lat - lat, prev.lon - lon);
    return dPrev < dCurr ? curr : prev;
  });
  res.json(point);
});

// Endpoint: GET /api/downtime
app.get('/api/downtime', (req, res) => {
  res.json(downtimeReviews);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
