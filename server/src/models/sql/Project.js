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
  // UPDATE: Changed from ENUM to STRING to allow 'UNIVERSITY', 'SELF-TAUGHT', etc.
  category: {
    type: DataTypes.STRING, 
    allowNull: false
  },
  techStack: {
    type: DataTypes.ARRAY(DataTypes.STRING), 
    defaultValue: []
  },
  // UPDATE: Added allowNull: true so you can save projects without links
  githubUrl: {
    type: DataTypes.STRING,
    allowNull: true, 
    validate: { isUrl: true }
  },
  liveUrl: {
    type: DataTypes.STRING,
    allowNull: true,
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
  timestamps: true 
});

module.exports = Project;