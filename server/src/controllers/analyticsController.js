const Log = require('../models/nosql/Log');
const geoip = require('geoip-lite'); // Required for location detection

// 1. RECORD A VISIT (New Function called by Frontend)
exports.recordVisit = async (req, res) => {
  try {
    // A. Get IP Address (Handle proxies like Render/Vercel)
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const cleanIp = ip.split(',')[0].trim();
    
    // B. Get Location from IP
    const geo = geoip.lookup(cleanIp);
    const country = geo ? geo.country : 'Unknown';
    const city = geo ? geo.city : 'Unknown';

    // C. Detect Browser & OS
    const userAgent = req.get('User-Agent') || '';
    let browser = 'Unknown';
    if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    const isMobile = /mobile/i.test(userAgent);
    // Simple OS extraction regex
    const os = userAgent.match(/\(([^)]+)\)/)?.[1] || 'Unknown OS';

    // D. Save to MongoDB
    await Log.create({
      path: req.body.path || '/',
      method: 'PAGE_VIEW',
      ip: cleanIp,
      country,
      city,
      browser: `${browser} (${isMobile ? 'Mobile' : 'Desktop'})`,
      os,
    });

    res.json({ msg: "Visit Recorded" });
  } catch (error) {
    console.error("Tracking Error:", error.message);
    res.status(500).json({ error: "Failed to track" });
  }
};

// 2. GET STATS (For Admin Dashboard)
exports.getStats = async (req, res) => {
  try {
    const now = new Date();
    
    // Calculate Date Ranges
    const startOfWeek = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    const startOfMonth = new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    const startOfYear = new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());

    // Run all queries in parallel for speed
    const [total, weekly, monthly, yearly, recentVisits] = await Promise.all([
      Log.countDocuments(),
      Log.countDocuments({ timestamp: { $gte: startOfWeek } }),
      Log.countDocuments({ timestamp: { $gte: startOfMonth } }),
      Log.countDocuments({ timestamp: { $gte: startOfYear } }),
      Log.find().sort({ timestamp: -1 }).limit(20).select('ip country city browser os timestamp')
    ]);

    res.json({ 
      total, 
      weekly, 
      monthly, 
      yearly, 
      recentVisits 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. DELETE SINGLE LOG
exports.deleteLog = async (req, res) => {
  try {
    const { id } = req.params;
    await Log.findByIdAndDelete(id);
    res.json({ msg: "Log deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. CLEAR ALL LOGS
exports.clearAllLogs = async (req, res) => {
  try {
    await Log.deleteMany({}); // Delete everything
    res.json({ msg: "All logs cleared" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};