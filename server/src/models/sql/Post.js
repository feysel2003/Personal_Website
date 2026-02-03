const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.postgres');

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT, // Supports long markdown text
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    defaultValue: "https://via.placeholder.com/800x400"
  },
  videoUrl: {
    type: DataTypes.STRING,
    allowNull: true // Optional
  },
  readTime: {
    type: DataTypes.STRING, // e.g., "5 min read"
    defaultValue: "5 min read"
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: []
  }
}, {
  timestamps: true
});

module.exports = Post;