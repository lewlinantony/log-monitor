// server/models/Log.js
const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true
  },
  level: { // Add this
    type: String,
    enum: ['INFO', 'WARN', 'ERROR'],
    default: 'INFO'
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Log', LogSchema);