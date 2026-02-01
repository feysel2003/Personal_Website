require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// DB Config
const { connectPostgres, sequelize } = require('./src/config/db.postgres');
const connectMongo = require('./src/config/db.mongo');

// Import Middleware
const trackVisit = require('./src/middleware/analytics');
const authMiddleware = require('./src/middleware/auth'); // <--- 1. Import Auth Middleware

const blogController = require('./src/controllers/blogController'); // <--- Import
const skillController = require('./src/controllers/skillController');

// Import Controllers
const projectController = require('./src/controllers/projectController');
const authController = require('./src/controllers/authController'); // <--- 2. Import Auth Controller
const journeyController = require('./src/controllers/journeyController');


const app = express();

// Core Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Custom Middleware
app.use(trackVisit);

// --- ROUTES ---

// A. Auth Routes (The missing part!)
app.post('/api/auth/login', authController.login); // <--- 3. THIS WAS LIKELY MISSING

// B. Public Routes
app.get('/', (req, res) => res.json({ msg: 'Portfolio API v1.0' }));
app.get('/api/projects', projectController.getProjects);
app.post('/api/contact', projectController.sendMessage);
app.post('/api/seed', projectController.seedProjects);
app.get('/api/skills', skillController.getSkills);
app.post('/api/seed-skills', skillController.seedSkills);
app.get('/api/journey', journeyController.getJourney);
app.post('/api/seed-journey', journeyController.seedJourney);

// C. Protected Routes (Admin Only)
app.post('/api/projects', authMiddleware, projectController.createProject);
app.get('/api/messages', authMiddleware, projectController.getMessages);
app.post('/api/journey', authMiddleware, journeyController.createJourney);
app.delete('/api/journey/:id', authMiddleware, journeyController.deleteJourney);
app.put('/api/journey/:id', authMiddleware, journeyController.updateJourney);


// BLOG ADMIN ROUTES
app.post('/api/posts', authMiddleware, blogController.createPost);
app.delete('/api/posts/:id', authMiddleware, blogController.deletePost);
app.put('/api/posts/:id', authMiddleware, blogController.updatePost);

app.post('/api/skills', authMiddleware, skillController.createSkill);
app.delete('/api/skills/:id', authMiddleware, skillController.deleteSkill);
app.put('/api/skills/:id', authMiddleware, skillController.updateSkill); // <--- Update Skill Route

// --- NEW ROUTES ---
app.put('/api/projects/:id', authMiddleware, projectController.updateProject);   // Update
app.delete('/api/projects/:id', authMiddleware, projectController.deleteProject); // Delete Project
app.delete('/api/messages/:id', authMiddleware, projectController.deleteMessage); // Delete Message

// --- BLOG ROUTES ---
// ... Routes
app.get('/api/posts', blogController.getPosts);       // Get List
app.get('/api/posts/:id', blogController.getPostById); // Get One
app.post('/api/seed-blog', blogController.seedBlog);  // Seed Data

// --- START SERVER ---
const startServer = async () => {
  try {
    await connectMongo();
    await connectPostgres();
    await sequelize.sync({ alter: true });
    console.log("✅ SQL Models Synced");

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error("❌ Server Crash:", error);
  }
};

startServer();