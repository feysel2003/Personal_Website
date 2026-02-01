const Log = require('../models/nosql/Log');

const trackVisit = async (req, res, next) => {
  try {
    // Fire and forget (don't wait for it to finish)
    Log.create({
      path: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  } catch (error) {
    console.error("Analytics Error:", error.message);
  }
  next(); // Keep the app moving
};

module.exports = trackVisit;