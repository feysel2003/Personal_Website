const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.postgres');

const Certification = sequelize.define('Certification', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING, // e.g. "The Complete Web Development Bootcamp"
    allowNull: false
  },
  issuer: {
    type: DataTypes.STRING, // e.g. "Udemy", "Coursera", "Oracle"
    allowNull: false
  },
  date: {
    type: DataTypes.STRING, // e.g. "Nov 2023"
    allowNull: false
  },
  link: {
    type: DataTypes.STRING, // Credential URL
    allowNull: true
  },
  imageUrl: {
    type: DataTypes.STRING, // Logo of issuer
    defaultValue: ""
  }
}, {
  timestamps: true
});

module.exports = Certification;