const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.postgres');

const ResumeItem = sequelize.define('ResumeItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  type: {
    type: DataTypes.ENUM('Education', 'Experience'),
    allowNull: false
  },
  title: {
    type: DataTypes.STRING, // e.g. "Software Engineer"
    allowNull: false
  },
  organization: {
    type: DataTypes.STRING, // e.g. "Google" or "Wachemo University"
    allowNull: false
  },
  startDate: {
    type: DataTypes.STRING, // e.g. "2023"
    allowNull: false
  },
  endDate: {
    type: DataTypes.STRING, // e.g. "Present"
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  technologies: {
    type: DataTypes.STRING, // e.g. "React, Node, AWS"
    allowNull: true
  }
}, {
  timestamps: true
});

module.exports = ResumeItem;