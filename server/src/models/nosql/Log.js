const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  path: String,       // Which page they visited
  method: String,     // GET, POST, etc.
  ip: String,         // User IP (Anonymized in real production)
  userAgent: String,  // Browser/Device info
  timestamp: { 
    type: Date, 
    default: Date.now 
  }
});

// Create a TTL (Time To Live) index so logs auto-delete after 30 days
// This keeps your free tier database from filling up!
LogSchema.index({ timestamp: 1 }, { expireAfterSeconds: 2592000 });

module.exports = mongoose.model('Log', LogSchema);