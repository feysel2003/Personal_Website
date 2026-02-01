const Project = require('../models/sql/Project');

// 1. Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.findAll({
      order: [['createdAt', 'DESC']] // Newest first
    });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Create a project (For you to use later)
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// ... existing code ...

// 3. Seed Database (Temporary)
exports.seedProjects = async (req, res) => {
  try {
    const sampleProjects = [
      {
        title: "Crypto Exchange DEX",
        description: "A decentralized exchange allowing users to swap tokens using Uniswap V3 protocol.",
        category: "WEB3",
        techStack: ["React", "Solidity", "Wagmi"],
        githubUrl: "https://github.com/yourname/dex",
        liveUrl: "https://dex-demo.com",
        imageUrl: "https://placehold.co/600x400/1e293b/FFF?text=DEX+Project"
      },
      {
        title: "E-Commerce Dashboard",
        description: "Full stack admin dashboard with chart analytics and inventory management.",
        category: "PERN",
        techStack: ["PostgreSQL", "Express", "React", "Node"],
        githubUrl: "https://github.com/yourname/dashboard",
        liveUrl: "https://dash-demo.com",
        imageUrl: "https://placehold.co/600x400/1e293b/FFF?text=Dashboard"
      },
      {
        title: "Social Media API",
        description: "High-performance REST API handling thousands of requests per second.",
        category: "MERN",
        techStack: ["MongoDB", "Express", "Redis"],
        githubUrl: "https://github.com/yourname/api",
        liveUrl: "https://api-demo.com",
        imageUrl: "https://placehold.co/600x400/1e293b/FFF?text=API+Backend"
      }
    ];

    await require('../models/sql/Project').bulkCreate(sampleProjects);
    res.json({ msg: "Database Seeded Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... existing code ...

const Message = require('../models/nosql/Message');

// 4. Handle Contact Form
exports.sendMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Save to MongoDB
    const newMessage = await Message.create({ name, email, message });
    
    res.status(201).json({ msg: "Message sent successfully!", id: newMessage._id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// 5. Get All Messages (Admin Only)
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 6. Delete a Project
exports.deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    await require('../models/sql/Project').destroy({ where: { id } });
    res.json({ msg: "Project deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 7. Update a Project
exports.updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    await require('../models/sql/Project').update(req.body, { where: { id } });
    res.json({ msg: "Project updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 8. Delete a Message
exports.deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    await require('../models/nosql/Message').findByIdAndDelete(id);
    res.json({ msg: "Message deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};