const { Sequelize } = require('sequelize');
require('dotenv').config();

// Initialize Sequelize with the connection string from .env
// We turn off logging to keep the terminal clean
const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: 'postgres',
  logging: false, 
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Required for Render/Neon/Supabase connections
    }
  }
});

const connectPostgres = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connected (Structured Data)');
  } catch (error) {
    console.error('❌ Postgres Connection Failed:', error.message);
  }
};

module.exports = { sequelize, connectPostgres };