const Skill = require('../models/sql/Skill');

// Get All Skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await Skill.findAll({ order: [['level', 'DESC']] });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create Skill
exports.createSkill = async (req, res) => {
  try {
    const skill = await Skill.create(req.body);
    res.status(201).json(skill);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Skill
exports.deleteSkill = async (req, res) => {
  try {
    await Skill.destroy({ where: { id: req.params.id } });
    res.json({ msg: "Skill deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    // Update the skill where the ID matches
    await require('../models/sql/Skill').update(req.body, { where: { id } });
    res.json({ msg: "Skill updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Seed Skills (for testing)
// 4. Seed Skills (Instant Setup)
exports.seedSkills = async (req, res) => {
  try {
    const skills = [
      // 1. University Skill
      { name: "Java (OOP)", category: "Academic", description: "Object-Oriented Programming & Design Patterns.", level: 90, iconName: "Code" },
      // 2. University Skill
      { name: "C++ & DSA", category: "Academic", description: "Memory management, Pointers, and Algorithms.", level: 85, iconName: "Terminal" },
      // 3. Frontend Skill
      { name: "React.js", category: "Frontend", description: "Building complex interactive UIs with Hooks.", level: 95, iconName: "Code" },
      // 4. Backend Skill
      { name: "Node.js & Express", category: "Backend", description: "Scalable REST APIs and Microservices.", level: 90, iconName: "Server" },
      // 5. Database Skill
      { name: "PostgreSQL", category: "Backend", description: "Complex relational data modeling (SQL).", level: 88, iconName: "Database" },
      // 6. Web3 Skill
      { name: "Solidity", category: "Web3", description: "Smart Contract development and Gas Optimization.", level: 85, iconName: "Cpu" }
    ];

    await require('../models/sql/Skill').bulkCreate(skills);
    res.json({ msg: "6 Skills Added Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};