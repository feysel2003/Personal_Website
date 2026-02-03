const Certification = require('../models/sql/Certification');

exports.getCerts = async (req, res) => {
  try {
    const certs = await Certification.findAll({ order: [['createdAt', 'DESC']] });
    res.json(certs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCert = async (req, res) => {
  try {
    const cert = await Certification.create(req.body);
    res.status(201).json(cert);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCert = async (req, res) => {
  try {
    const { id } = req.params;
    await Certification.update(req.body, { where: { id } });
    res.json({ msg: "Updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteCert = async (req, res) => {
  try {
    const { id } = req.params;
    await Certification.destroy({ where: { id } });
    res.json({ msg: "Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ... existing functions ...

// 5. Seed Certifications (Quick Setup)
exports.seedCertifications = async (req, res) => {
  try {
    // Clear existing to avoid duplicates
    await require('../models/sql/Certification').destroy({ where: {}, truncate: true });

    const certs = [
      {
        title: "The Complete 2024 Web Development Bootcamp",
        issuer: "Udemy (Dr. Angela Yu)",
        date: "Jan 2024", // You can edit this later
        link: "#", // You can paste your real certificate URL in Admin later
        imageUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Udemy_logo.svg"
      },
      {
        title: "Responsive Web Design",
        issuer: "freeCodeCamp",
        date: "Aug 2023",
        link: "#",
        imageUrl: "https://design-style-guide.freecodecamp.org/downloads/fcc_primary_small.jpg"
      }
    ];

    await require('../models/sql/Certification').bulkCreate(certs);
    res.json({ msg: "Certifications Added Successfully!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};