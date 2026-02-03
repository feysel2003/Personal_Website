const mongoose = require('mongoose');
require('dotenv').config();

const connectMongo = async () => {
  try {
    // Configuration to handle unstable networks
    const options = {
      serverSelectionTimeoutMS: 60000, // Keep trying to send operations for 60 seconds
      socketTimeoutMS: 60000,          // Close sockets after 60 seconds of inactivity
      connectTimeoutMS: 60000,         // Give up initial connection after 60 seconds (Fixes your error)
    };

    // Attempt connection
    await mongoose.connect(process.env.MONGO_URI, options);
    
    console.log('✅ MongoDB Connected (Analytics & Logs)');

    // Listen for errors AFTER initial connection
    mongoose.connection.on('error', (err) => {
      console.error('⚠️ MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB disconnected. Attempting to reconnect...');
    });

  } catch (error) {
    console.error('❌ MongoDB Initial Connection Failed:', error.message);
    // Do NOT exit process.exit(1), just log it so the server keeps running
  }
};

module.exports = connectMongo;