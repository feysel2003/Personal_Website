import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import ALL icons
import { Code, Database, Cpu, Globe, Server, Layers, Terminal, Shield, BookOpen, PenTool, Layout, Zap } from 'lucide-react';
import API from '../services/api';

// 1. Icon Mapping: String -> Component
const iconMap = {
  Code: <Code size={20} />,
  Database: <Database size={20} />,
  Cpu: <Cpu size={20} />,
  Globe: <Globe size={20} />,
  Server: <Server size={20} />,
  Layers: <Layers size={20} />,
  Terminal: <Terminal size={20} />,
  Shield: <Shield size={20} />,
  BookOpen: <BookOpen size={20} />,
  PenTool: <PenTool size={20} />,
  Layout: <Layout size={20} />,
  Zap: <Zap size={20} />
};

const categories = ["All", "Academic", "Frontend", "Backend", "Web3"];

const Skills = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from DB
  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const res = await API.get('/skills');
        setSkills(res.data);
      } catch (error) {
        console.error("Error loading skills");
      } finally {
        setLoading(false);
      }
    };
    fetchSkills();
  }, []);

  // Filter Logic (Case Insensitive for safety)
  const filteredSkills = activeTab === "All" 
    ? skills 
    : skills.filter(skill => skill.category.toLowerCase() === activeTab.toLowerCase());

  if (loading) return <div className="text-center py-20 text-gray-500">Loading Skills...</div>;

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-10 opacity-50" />

      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 mb-4 text-xs font-bold tracking-wider text-blue-600 uppercase bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400 rounded-full"
          >
            Skills & Tools
          </motion.div>
          
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
            My Technical <span className="text-blue-600 dark:text-blue-500">Stack</span>
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
            The languages, frameworks, and technologies I use to build software. 
            Ranging from <strong>University fundamentals</strong> to modern <strong>Web3 & Full Stack</strong> tools.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-2 mb-16 flex-wrap">
          {categories.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${
                activeTab === tab 
                  ? "text-white shadow-lg shadow-blue-500/25" 
                  : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white dark:hover:bg-slate-800"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-blue-600 dark:bg-blue-600 rounded-xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Grid System */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence mode='popLayout'>
            {filteredSkills.map((skill) => (
              <motion.div
                layout
                key={skill.id}
                // FIX: Explicit animation props instead of parent variants
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white dark:bg-slate-900/80 border border-gray-200 dark:border-slate-800 rounded-2xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-500 transition-colors duration-300 shadow-sm hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Top Section: Icon & Level */}
                <div className="p-5 flex items-start justify-between">
                  <div className="p-3 bg-gray-50 dark:bg-slate-800 rounded-xl text-gray-700 dark:text-gray-300 group-hover:text-white group-hover:bg-blue-600 transition-colors duration-300">
                    {iconMap[skill.iconName] || <Code size={20}/>}
                  </div>
                  <span className="text-xs font-mono font-bold text-gray-400 dark:text-slate-500 group-hover:text-blue-500 transition-colors">
                    {skill.level}%
                  </span>
                </div>

                {/* Content */}
                <div className="px-5 pb-8">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:translate-x-1 transition-transform duration-300">
                    {skill.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
                    {skill.description}
                  </p>
                </div>

                {/* Bottom Progress Line */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-100 dark:bg-slate-800">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  />
                </div>

                {/* Subtle Hover Gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-blue-50/50 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {filteredSkills.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-400">
            <p>No skills found in this category.</p>
          </div>
        )}

      </div>
    </section>
  );
};

export default Skills;