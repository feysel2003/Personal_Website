require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// DB Config
const { connectPostgres, sequelize } = require('./src/config/db.postgres');
const connectMongo = require('./src/config/db.mongo');

// Import Middleware
// const trackVisit = require('./src/middleware/analytics'); // <--- REMOVED Global Middleware
const authMiddleware = require('./src/middleware/auth');

// Import Controllers
const projectController = require('./src/controllers/projectController');
const authController = require('./src/controllers/authController');
const journeyController = require('./src/controllers/journeyController');
const serviceController = require('./src/controllers/serviceController');
const certController = require('./src/controllers/certificationController');
const analyticsController = require('./src/controllers/analyticsController');
const blogController = require('./src/controllers/blogController');
const skillController = require('./src/controllers/skillController');
const resumeController = require('./src/controllers/resumeController');

const app = express();

// Core Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Custom Middleware
// app.use(trackVisit); // <--- REMOVED: Stops tracking every single request automatically

// --- ROUTES ---

// 1. ANALYTICS (Manual Trigger)
// The frontend will call this ONLY when a user views a page (not admin)
app.post('/api/visit', analyticsController.recordVisit); 

// A. Auth Routes
app.post('/api/auth/login', authController.login);

// B. Public Routes
app.get('/', (req, res) => res.json({ msg: 'Portfolio API v1.0' }));

// Projects
app.get('/api/projects', projectController.getProjects);
app.post('/api/seed', projectController.seedProjects);

// Skills
app.get('/api/skills', skillController.getSkills);
app.post('/api/seed-skills', skillController.seedSkills);

// Journey
app.get('/api/journey', journeyController.getJourney);
app.post('/api/seed-journey', journeyController.seedJourney);

// Services
app.get('/api/services', serviceController.getServices);
app.post('/api/seed-services', serviceController.seedServices);

// Certifications
app.get('/api/certifications', certController.getCerts);
app.post('/api/seed-certifications', certController.seedCertifications);

// Blog
app.get('/api/posts', blogController.getPosts);
app.get('/api/posts/:id', blogController.getPostById);
app.post('/api/seed-blog', blogController.seedBlog);

// Contact
app.post('/api/contact', projectController.sendMessage);

// Resume
app.get('/api/resume', resumeController.getItems);

// C. Protected Routes (Admin Only - Requires Token)

// Analytics Data
app.get('/api/analytics', authMiddleware, analyticsController.getStats);
app.delete('/api/analytics/log/:id', authMiddleware, analyticsController.deleteLog);
app.delete('/api/analytics/clear', authMiddleware, analyticsController.clearAllLogs);

// Project Management
app.post('/api/projects', authMiddleware, projectController.createProject);
app.put('/api/projects/:id', authMiddleware, projectController.updateProject);
app.delete('/api/projects/:id', authMiddleware, projectController.deleteProject);

// Message Management
app.get('/api/messages', authMiddleware, projectController.getMessages);
app.delete('/api/messages/:id', authMiddleware, projectController.deleteMessage);

// Journey Management
app.post('/api/journey', authMiddleware, journeyController.createJourney);
app.put('/api/journey/:id', authMiddleware, journeyController.updateJourney);
app.delete('/api/journey/:id', authMiddleware, journeyController.deleteJourney);

// Certifications Management
app.post('/api/certifications', authMiddleware, certController.createCert);
app.put('/api/certifications/:id', authMiddleware, certController.updateCert);
app.delete('/api/certifications/:id', authMiddleware, certController.deleteCert);

// Services Management
app.post('/api/services', authMiddleware, serviceController.createService);
app.put('/api/services/:id', authMiddleware, serviceController.updateService);
app.delete('/api/services/:id', authMiddleware, serviceController.deleteService);

// Blog Management
app.post('/api/posts', authMiddleware, blogController.createPost);
app.put('/api/posts/:id', authMiddleware, blogController.updatePost);
app.delete('/api/posts/:id', authMiddleware, blogController.deletePost);

// Skills Management
app.post('/api/skills', authMiddleware, skillController.createSkill);
app.put('/api/skills/:id', authMiddleware, skillController.updateSkill);
app.delete('/api/skills/:id', authMiddleware, skillController.deleteSkill);

// Resume Management
app.post('/api/resume', authMiddleware, resumeController.createItem);
app.put('/api/resume/:id', authMiddleware, resumeController.updateItem);
app.delete('/api/resume/:id', authMiddleware, resumeController.deleteItem);
app.post('/api/seed-resume', resumeController.seedResume);

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