const ResumeItem = require('../models/sql/ResumeItem');

// Get All (Sorted by newest)
exports.getItems = async (req, res) => {
  try {
    const items = await ResumeItem.findAll({ order: [['createdAt', 'DESC']] });
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Create
exports.createItem = async (req, res) => {
  try {
    const item = await ResumeItem.create(req.body);
    res.status(201).json(item);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update
exports.updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    await ResumeItem.update(req.body, { where: { id } });
    res.json({ msg: "Updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete
exports.deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    await ResumeItem.destroy({ where: { id } });
    res.json({ msg: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// SEED DATA (For instant setup)
exports.seedResume = async (req, res) => {
  try {
    await ResumeItem.destroy({ where: {}, truncate: true });
    const data = [
      {
        type: "Experience",
        title: "Freelance Smart Contract Developer",
        organization: "Remote / Upwork",
        startDate: "Jan 2024",
        endDate: "Present",
        description: "Developing secure ERC-20 and NFT smart contracts for international clients. Auditing gas usage and integrating React frontends with Wagmi.",
        technologies: "Solidity, Hardhat, React.js, IPFS"
      },
      {
        type: "Education",
        title: "BSc in Software Engineering",
        organization: "Wachemo University (WCU)",
        startDate: "Oct 2021",
        endDate: "Present",
        description: "4th Year Student. Consistently maintaining top GPA. Leading the student tech club in organizing coding bootcamps.",
        technologies: "Java, C++, Distributed Systems, System Design"
      },

      // --- PAST PROJECTS / WORK ---
      {
        type: "Experience",
        title: "Full Stack Web Developer",
        organization: "Freelance (Addis Ababa)",
        startDate: "Jun 2023",
        endDate: "Dec 2023",
        description: "Built responsive business websites for local SMEs. Migrated legacy HTML sites to React and improved SEO performance by 40%.",
        technologies: "React, Tailwind CSS, Node.js, Firebase"
      },
      {
        type: "Education",
        title: "The Complete Web Development Bootcamp",
        organization: "Udemy (Dr. Angela Yu)",
        startDate: "Jan 2023",
        endDate: "Jul 2023",
        description: "Intensive 6-month self-paced bootcamp covering the entire MERN stack. Built 15+ projects including a clone of Keeper App.",
        technologies: "MongoDB, Express, React, Node, REST APIs"
      },

      // --- EARLY CAREER ---
      {
        type: "Experience",
        title: "IT Support & Lab Assistant",
        organization: "Wachemo University ICT Center",
        startDate: "Sep 2022",
        endDate: "May 2023",
        description: "Volunteered to maintain computer lab hardware and assisted 1st-year students with C++ programming environments.",
        technologies: "Linux, Networking, C++, Hardware"
      },
      {
        type: "Education",
        title: "Responsive Web Design Certification",
        organization: "freeCodeCamp",
        startDate: "Feb 2022",
        endDate: "Aug 2022",
        description: "Mastered the fundamentals of the web. Completed 5 certification projects including a Portfolio and Product Landing Page.",
        technologies: "HTML5, CSS3, Flexbox, CSS Grid, Accessibility"
      },

      // --- FOUNDATION ---
      {
        type: "Education",
        title: "Natural Science Stream",
        organization: "Abaferansua Secondary School",
        startDate: "2018",
        endDate: "2021",
        description: "Graduated with Distinction. Scored >500 in the National Higher Education Entrance Exam (First university-administered batch).",
        technologies: "Mathematics, Physics, Logic"
      }
    ];
    await ResumeItem.bulkCreate(data);
    res.json({ msg: "Resume Seeded!" });
  } catch (error) { res.status(500).json({ error: error.message }); }
};