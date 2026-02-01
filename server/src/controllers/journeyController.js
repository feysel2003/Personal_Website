const Journey = require('../models/sql/Journey');

// Get All (Sorted by Order ID descending)
exports.getJourney = async (req, res) => {
  try {
    const journey = await Journey.findAll({ order: [['orderId', 'DESC']] });
    res.json(journey);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add Entry
exports.createJourney = async (req, res) => {
  try {
    const entry = await Journey.create(req.body);
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Entry
exports.updateJourney = async (req, res) => {
  try {
    const { id } = req.params;
    await require('../models/sql/Journey').update(req.body, { where: { id } });
    res.json({ msg: "Entry updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete Entry
exports.deleteJourney = async (req, res) => {
  try {
    await Journey.destroy({ where: { id: req.params.id } });
    res.json({ msg: "Entry deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... existing functions ...

// 4. Seed Journey (Test Data)
exports.seedJourney = async (req, res) => {
  try {
    const journeyData = [
      {
        year: "Year 3 - Semester II (Current)",
        type: "University",
        title: "Software Architecture & OS",
        description: "Focusing on low-level system operations, advanced algorithms, and software design patterns. Leading the class team in the System Design project.",
        instructor: "Addis Ababa University", // Or your specific uni name
        skills: ["Design Patterns", "Operating Systems", "Advanced Algorithms"],
        projectTitle: "University Portal System",
        projectLink: "#",
        orderId: 4
      },
      {
        year: "Year 3 - Semester I",
        type: "Self-Taught",
        title: "Full Stack & Web3 Breakthrough",
        description: "Completed Dr. Angela Yu's Bootcamp. Transitioned from simple static sites to complex dApps. Learned how to connect React frontends to Solidity smart contracts.",
        instructor: "Dr. Angela Yu (Udemy)",
        skills: ["React.js", "Node.js", "Solidity", "Ether.js"],
        projectTitle: "DeFi Token Exchange",
        projectLink: "https://github.com/yourname/dex",
        orderId: 3
      },
      {
        year: "Year 2 - Semester II",
        type: "University",
        title: "Object Oriented Programming (OOP)",
        description: "Mastered Java and Database Systems. Built a strong foundation in relational data modeling and backend logic using JDBC.",
        instructor: "University Professor",
        skills: ["Java", "MySQL", "JDBC", "Data Structures"],
        projectTitle: "Library Management System",
        projectLink: "#",
        orderId: 2
      },
      {
        year: "Year 2 - Semester I",
        type: "Self-Taught",
        title: "Responsive Web Design",
        description: "Started my coding journey outside of class. Completed the FreeCodeCamp Responsive Web Design certification.",
        instructor: "FreeCodeCamp",
        skills: ["HTML5", "CSS3", "JavaScript ES6", "Flexbox"],
        projectTitle: "Personal Landing Page",
        projectLink: "#",
        orderId: 1
      }
    ];

    await require('../models/sql/Journey').bulkCreate(journeyData);
    res.json({ msg: "Journey Timeline Seeded Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};