const Log = require('../models/nosql/Log');
const geoip = require('geoip-lite');

const trackVisit = async (req, res, next) => {
  try {
    // 1. IGNORE Admin Actions & Static Files to prevent fake high numbers
    const ignorePaths = ['/api/auth', '/api/analytics', '/favicon.ico'];
    // If the path contains 'admin' or matches ignored paths, skip logging
    if (req.path.includes('admin') || ignorePaths.some(p => req.path.includes(p))) {
      return next();
    }

    // 2. Get IP
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
    const cleanIp = ip.split(',')[0];
    
    // 3. Get Location
    const geo = geoip.lookup(cleanIp);
    const country = geo ? geo.country : 'Localhost/Unknown';
    const city = geo ? geo.city : '-';

    // 4. Improved Browser Detection
    const userAgent = req.get('User-Agent') || '';
    let browser = 'Unknown';
    if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';

    const isMobile = /mobile/i.test(userAgent);
    const os = userAgent.match(/\(([^)]+)\)/)?.[1] || 'Unknown OS';

    // 5. Save Log
    if (req.method === 'GET') {
      await Log.create({
        path: req.path,
        method: req.method,
        ip: cleanIp,
        country,
        city,
        browser: `${browser} (${isMobile ? 'Mobile' : 'Desktop'})`,
        os,
      });
    }

  } catch (error) {
    console.error("Analytics Error:", error.message);
  }
  next();
};

module.exports = trackVisit;