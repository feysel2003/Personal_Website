const Service = require('../models/sql/Service');

// Get All
exports.getServices = async (req, res) => {
  try {
    const services = await Service.findAll({ order: [['createdAt', 'ASC']] });
    res.json(services);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create
exports.createService = async (req, res) => {
  try {
    const service = await Service.create(req.body);
    res.status(201).json(service);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateService = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.update(req.body, { where: { id } });
    res.json({ msg: "Service updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteService = async (req, res) => {
  try {
    const { id } = req.params;
    await Service.destroy({ where: { id } });
    res.json({ msg: "Service deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... existing functions ...

// 5. Seed Services (Quick Setup)
exports.seedServices = async (req, res) => {
  try {
    // Clear existing services to prevent duplicates
    await require('../models/sql/Service').destroy({ where: {}, truncate: true });

    const services = [
      {
        title: "Full Stack Web Development",
        description: "Building responsive, high-performance web applications using the MERN (MongoDB) or PERN (PostgreSQL) stack.",
        icon: "Globe",
        features: ["React/Next.js UI", "Secure API Development", "Database Optimization", "Deployment (Vercel/Render)"],
        price: "Project-based"
      },
      {
        title: "Smart Contract Development",
        description: "Writing secure, gas-optimized Solidity smart contracts for the Ethereum blockchain.",
        icon: "Cpu",
        features: ["ERC-20/ERC-721 Tokens", "DeFi Logic", "Hardhat Testing", "Security Audits"],
        price: "Hourly / Fixed"
      },
      {
        title: "dApp Integration",
        description: "Connecting your Web2 frontend to Web3. Seamless wallet connections and blockchain interactions.",
        icon: "Code",
        features: ["Wagmi/Viem Integration", "WalletConnect Support", "Real-time Event Listening", "Custom Hooks"],
        price: "Project-based"
      },
      {
        title: "Backend API Engineering",
        description: "Robust RESTful APIs designed for scalability and security using Node.js and Express.",
        icon: "Server",
        features: ["JWT Authentication", "Role-Based Access", "PostgreSQL/MongoDB", "Swagger Documentation"],
        price: "Hourly"
      },
      {
        title: "Technical Consultation",
        description: "Need help planning your architecture or learning new tech? I offer guidance for startups and students.",
        icon: "PenTool",
        features: ["Code Reviews", "Architecture Planning", "Tutoring (Java/JS/Solidity)", "Career Advice"],
        price: "Contact for Quote"
      }
    ];

    await require('../models/sql/Service').bulkCreate(services);
    res.json({ msg: "5 Services Added Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};