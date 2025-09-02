const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5001;
const mongoose = require('mongoose');
const Log = require('./models/Log');
require('dotenv').config();

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully."))
  .catch(err => console.error("MongoDB connection error:", err));  

// A test route to make sure everything is working
app.get("/api/test", (req, res) => {
    res.json({ message: "Hello from the backend! Your server is running. 🚀" });
});

// API route to GET all logs
app.get("/api/logs", async (req, res) => {
  try {
    const filter = req.query.level ? { level: req.query.level } : {};
    const logs = await Log.find(filter).sort({ timestamp: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching logs." });
  }
});

// API route to POST a new log
app.post("/api/logs", async (req, res) => {
  try {
    const newLog = new Log({
      message: req.body.message,
      level: req.body.level // Add this
    });
    const savedLog = await newLog.save();
    res.status(201).json(savedLog);
  } catch (err) {
    res.status(500).json({ message: "Error saving log." });
  }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});