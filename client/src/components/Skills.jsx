import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// Import ALL icons you might want to use
import { Code, Database, Cpu, Globe, Server, Layers, Terminal, Shield, BookOpen, PenTool, Layout } from 'lucide-react';
import API from '../services/api';

// 1. Icon Mapping: String -> Component
const iconMap = {
  Code: <Code size={24} />,
  Database: <Database size={24} />,
  Cpu: <Cpu size={24} />,
  Globe: <Globe size={24} />,
  Server: <Server size={24} />,
  Layers: <Layers size={24} />,
  Terminal: <Terminal size={24} />,
  Shield: <Shield size={24} />,
  BookOpen: <BookOpen size={24} />,
  PenTool: <PenTool size={24} />,
  Layout: <Layout size={24} />
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

  const filteredSkills = activeTab === "All" 
    ? skills 
    : skills.filter(skill => skill.category === activeTab);

  if (loading) return <div className="text-center py-20">Loading Skills...</div>;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
          Technical <span className="text-blue-600 dark:text-blue-500">Arsenal</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
          My academic foundation and self-taught modern tech stack.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-4 mb-12 flex-wrap">
        {categories.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`relative px-6 py-2 rounded-full text-sm font-bold transition-all ${
              activeTab === tab 
                ? "text-white" 
                : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            }`}
          >
            {activeTab === tab && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-blue-600 dark:bg-blue-600 rounded-full"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
            <span className="relative z-10">{tab}</span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode='popLayout'>
          {filteredSkills.map((skill) => (
            <motion.div
              layout
              key={skill.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-800 p-6 rounded-2xl hover:border-blue-500/50 transition-colors group relative overflow-hidden shadow-sm hover:shadow-md dark:shadow-none"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-blue-600 dark:text-blue-400">
                    {/* Render Icon Dynamically from Map, Default to Code */}
                    {iconMap[skill.iconName] || <Code size={24}/>}
                  </div>
                  <span className="text-xs font-mono text-gray-500 dark:text-gray-500 bg-gray-100 dark:bg-slate-950 px-2 py-1 rounded">
                    {skill.level}%
                  </span>
                </div>

                <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{skill.name}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 leading-relaxed">
                  {skill.description}
                </p>

                <div className="w-full bg-gray-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      
      {filteredSkills.length === 0 && !loading && <p className="text-center text-gray-500">No skills found. Login to Admin to add some!</p>}

    </section>
  );
};

export default Skills;