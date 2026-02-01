const Post = require('../models/sql/Post');

// 1. Get All Posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ order: [['createdAt', 'DESC']] });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Get Single Post
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update Post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    await require('../models/sql/Post').update(req.body, { where: { id } });
    res.json({ msg: "Post updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 3. Seed Blog (Your Personal Insights)
exports.seedBlog = async (req, res) => {
  try {
    // Clear existing posts
    await require('../models/sql/Post').destroy({ where: {}, truncate: true });

    const posts = [
      {
        title: "University vs. Bootcamps: Why I Do Both",
        content: "# The Best of Both Worlds\n\nIn Ethiopia, our 5-year Software Engineering degree gives us a rock-solid foundation in **Math, Physics, and Algorithms**. We learn *how* computers think.\n\nBut the industry moves fast. That's why I started taking **Dr. Angela Yu's** course on Udemy.\n\n### The Balance\n1. **University:** C++, Java, Design Patterns.\n2. **Self-Taught:** React, Node, Web3.\n\nCombining these makes me a stronger engineer than doing just one.",
        imageUrl: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800",
        readTime: "5 min read",
        tags: ["Career", "Education", "Ethiopia"]
      },
      {
        title: "From Java Swing to React.js",
        content: "In Year 2, we built a Library Management System using **Java Swing**. It was great for learning OOP, but the UI felt old.\n\n## Enter React\nWhen I started learning React, everything changed. Component-based architecture feels so much more natural for the web.\n\n```javascript\nconst Component = () => {\n  return <h1>Hello World</h1>\n}\n```\n\nHowever, understanding Java Classes helped me grasp React Hooks and State much faster.",
        imageUrl: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800",
        readTime: "4 min read",
        tags: ["Java", "React", "Frontend"]
      },
      {
        title: "Why I Chose Web3 as My Specialization",
        content: "# The Future is Decentralized\n\nWhile learning the MERN stack, I realized that **Databases** (like MongoDB) are owned by a central admin. \n\n**Blockchain** changes this.\n\nI started writing **Solidity** contracts to understand how we can build trustless systems. It's the hardest thing I've learned, but the most rewarding.",
        imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&w=800",
        readTime: "6 min read",
        tags: ["Web3", "Blockchain", "Solidity"]
      }
    ];

    await require('../models/sql/Post').bulkCreate(posts);
    res.json({ msg: "Blog Updated with Personal Stories!" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 4. Create Post (Admin)
exports.createPost = async (req, res) => {
  try {
    const post = await require('../models/sql/Post').create(req.body);
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 5. Delete Post (Admin)
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    await require('../models/sql/Post').destroy({ where: { id } });
    res.json({ msg: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};