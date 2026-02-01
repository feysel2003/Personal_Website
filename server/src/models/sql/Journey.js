const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.postgres');

const Journey = sequelize.define('Journey', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  year: {
    type: DataTypes.STRING, // e.g., "Year 3 - Semester 1"
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('University', 'Self-Taught', 'Certification'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING, // e.g., "Web3 Breakthrough"
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  instructor: {
    type: DataTypes.STRING, // e.g., "Dr. Angela Yu"
    allowNull: true
  },
  skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  },
  projectTitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  projectLink: {
    type: DataTypes.STRING, // URL to GitHub/Live
    allowNull: true
  },
  orderId: {
    type: DataTypes.INTEGER, // To sort them manually (1, 2, 3...)
    defaultValue: 0
  }
}, {
  timestamps: true
});

module.exports = Journey;