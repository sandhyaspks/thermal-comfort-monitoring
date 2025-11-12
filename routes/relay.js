const express = require("express");
const router = express.Router();

// Relay state with scheduling and manual override
let relayState = {
  fan: "off",           // current fan state
  autoMode: true,       // auto temperature control
  manualOverride: false,// if manual override is active
  schedule: {           // scheduled ON/OFF times in HH:MM format
    onTime: "",
    offTime: ""
  },
  lastUpdated: new Date()
};

// ================== 1️⃣ Manual Control ==================
router.post("/manual", (req, res) => {
  const { fan } = req.body;
  if (fan !== "on" && fan !== "off") {
    return res.status(400).json({ msg: "Invalid fan state" });
  }

  relayState.fan = fan;
  relayState.manualOverride = true; // manual override enabled
  relayState.autoMode = false;      // disable auto mode temporarily
  relayState.lastUpdated = new Date();

  console.log(`🧭 Manual: Fan turned ${fan}`);
  return res.json({ msg: `Fan turned ${fan}`, relayState });
});

// ================== 2️⃣ Schedule Control ==================
router.post("/schedule", (req, res) => {
  const { onTime, offTime } = req.body;
  if (!onTime || !offTime) {
    return res.status(400).json({ msg: "Both onTime and offTime required" });
  }

  relayState.schedule = { onTime, offTime };
  relayState.autoMode = true;        // enable auto within schedule
  relayState.manualOverride = false; // clear manual override
  relayState.lastUpdated = new Date();

  console.log(`🕒 Schedule set: ON at ${onTime}, OFF at ${offTime}`);
  return res.json({ msg: `Schedule updated`, relayState });
});

// ================== 3️⃣ Auto Mode / ESP32 Data ==================
router.post("/auto", (req, res) => {
  const { temperature, humidity } = req.body;
  if (temperature === undefined || humidity === undefined) {
    return res.status(400).json({ msg: "Temperature and humidity required" });
  }

  const now = new Date();
  const currentTime = now.toTimeString().slice(0,5); // HH:MM
  const { onTime, offTime } = relayState.schedule;

  // If manual override is active, do nothing
  if (!relayState.manualOverride) {
    // Check scheduled period
    if (onTime && offTime) {
      if (currentTime >= onTime && currentTime < offTime) {
        relayState.autoMode = true;
        // Auto fan control based on temperature
        relayState.fan = (temperature > 28) ? "on" : "off";
      } else {
        relayState.fan = "off"; // outside scheduled time fan is OFF
        relayState.autoMode = false;
      }
    } else {
      // No schedule defined, fallback auto mode
      relayState.autoMode = true;
      relayState.fan = (temperature > 28) ? "on" : "off";
    }
  }

  relayState.lastUpdated = now;
  console.log(`🌡️ Temp: ${temperature}°C | Humidity: ${humidity}% | Fan: ${relayState.fan} | ManualOverride: ${relayState.manualOverride}`);

  return res.json({
    msg: "Auto processed",
    relayState
  });
});

// ================== 4️⃣ Get Relay Status ==================
router.get("/status", (req, res) => {
  return res.json(relayState);
});

module.exports = router;
