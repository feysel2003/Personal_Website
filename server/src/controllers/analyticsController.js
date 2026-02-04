const Log = require('../models/nosql/Log');

exports.getStats = async (req, res) => {
  try {
    const now = new Date();
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);

    // 1. Get Counts
    const total = await Log.countDocuments();
    const weekly = await Log.countDocuments({ timestamp: { $gte: startOfWeek } });

    // 2. Get Recent Visitors (Limit 20)
    // We select specific fields to send to frontend
    const recentVisits = await Log.find()
      .sort({ timestamp: -1 })
      .limit(20)
      .select('ip country city browser os timestamp');

    res.json({ 
      total, 
      weekly, 
      recentVisits // <--- Sending the list
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE SINGLE LOG
exports.deleteLog = async (req, res) => {
  try {
    const { id } = req.params;
    await Log.findByIdAndDelete(id);
    res.json({ msg: "Log deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// CLEAR ALL LOGS
exports.clearAllLogs = async (req, res) => {
  try {
    await Log.deleteMany({}); // Delete everything
    res.json({ msg: "All logs cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};