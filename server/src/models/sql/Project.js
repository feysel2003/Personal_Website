const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.postgres');

const Project = sequelize.define('Project', {
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
  category: {
    type: DataTypes.ENUM('MERN', 'PERN', 'WEB3'),
    allowNull: false
  },
  techStack: {
    type: DataTypes.ARRAY(DataTypes.STRING), // e.g. ["React", "Solidity"]
    defaultValue: []
  },
  githubUrl: {
    type: DataTypes.STRING,
    validate: { isUrl: true }
  },
  liveUrl: {
    type: DataTypes.STRING,
    validate: { isUrl: true }
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: "https://via.placeholder.com/400"
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt automatically
});

module.exports = Project;