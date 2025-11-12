const express = require('express');
const router = express.Router();
const Reading = require('../models/Reading');

// POST: Add a new reading from ESP32
router.post('/readings', async (req, res) => {
  try {
    const { temperature, humidity } = req.body;
    const newReading = new Reading({ temperature, humidity });
    await newReading.save();
    res.json({ message: 'Sensor data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ NEW: Alias POST route for ESP32 to use /api/sensor
router.post('/sensor', async (req, res) => {
  try {
    const { temperature, humidity } = req.body;
    const newReading = new Reading({ temperature, humidity });
    await newReading.save();
    res.json({ message: 'Sensor data saved successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET: Fetch latest 50 readings
router.get('/readings', async (req, res) => {
  try {
    const readings = await Reading.find().sort({ timestamp: -1 }).limit(50);
    res.json(readings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
