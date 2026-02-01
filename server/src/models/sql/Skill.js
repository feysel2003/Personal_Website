const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config/db.postgres');

const Skill = sequelize.define('Skill', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING, // "Frontend", "Backend", "Web3", "Academic"
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  level: {
    type: DataTypes.INTEGER, // 0 to 100
    defaultValue: 50
  },
  iconName: {
    type: DataTypes.STRING, // "Code", "Server", "Cpu", etc.
    defaultValue: "Code"
  }
}, {
  timestamps: true
});

module.exports = Skill;