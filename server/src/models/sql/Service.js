const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.postgres');

const Service = sequelize.define('Service', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  icon: {
    type: DataTypes.STRING, // e.g., "Code", "Smartphone", "Server"
    defaultValue: "Code"
  },
  features: {
    type: DataTypes.ARRAY(DataTypes.STRING), // e.g. ["Responsive", "SEO Friendly"]
    defaultValue: []
  },
  price: {
    type: DataTypes.STRING, // e.g., "Starting at $500" or "Hourly"
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = Service;