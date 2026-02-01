import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, FileText, Code, Database, Globe, Cpu, CheckCircle } from "lucide-react";
import API from '../services/api'; 

import ProjectCard from '../components/ProjectCard'; 
import Contact from '../components/Contact';
import Guestbook from '../components/Guestbook';
import Skills from '../components/Skills';

// Orbiting Icon Component Helper
const OrbitIcon = ({ icon, delay, radius }) => (
  <motion.div
    className="absolute left-1/2 top-1/2 bg-white dark:bg-slate-800 p-3 rounded-full border border-gray-200 dark:border-slate-700 shadow-lg text-blue-500 dark:text-blue-400"
    animate={{ rotate: 360 }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -delay }}
    style={{ translateX: "-50%", translateY: "-50%" }}
  >
    <div style={{ transform: `translate(${radius}px) rotate(-${0}deg)` }}>
       {/* Counter-rotate icon to keep it upright */}
       <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: -delay }}>
         {icon}
       </motion.div>
    </div>
  </motion.div>
);

function Home() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]); 
  const [filter, setFilter] = useState('ALL'); 
  const [loading, setLoading] = useState(true);

  // Fetch Data
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await API.get('/projects');
        setProjects(res.data);
        setFilteredProjects(res.data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  // Handle Filtering Logic
  useEffect(() => {
    if (filter === 'ALL') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
  }, [filter, projects]);

  return (
    // FIX 1: Removed hardcoded bg-[#0f172a] and text-white. 
    // Now it relies on index.css body styles.
    <div className="min-h-screen">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-[90vh] flex flex-col md:flex-row items-center gap-12">
        
        {/* LEFT: Text Content */}
       <div className="flex-1 text-center md:text-left z-10">
  <motion.div 
    initial={{ opacity: 0, x: -50 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.8 }}
  >
    <span className="text-blue-600 dark:text-blue-500 font-mono tracking-wider text-sm">
      3RD YEAR SOFTWARE ENGINEERING STUDENT
    </span>
    
    <h1 className="text-5xl md:text-7xl font-bold mt-4 mb-6 leading-tight text-gray-900 dark:text-white">
      Documenting My <br />
      <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-500 dark:to-pink-500 bg-clip-text text-transparent">
        Engineering Journey
      </span>
    </h1>
    
    <p className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-lg mx-auto md:mx-0 mb-8 leading-relaxed">
      From <span className="font-bold text-gray-800 dark:text-white">Addis Ababa</span> to the Blockchain. 
      Bridging the gap between University Theory (Java, C++, DSA) and Modern Practice (MERN, Web3).
    </p>

    <div className="flex flex-wrap gap-4 justify-center md:justify-start">
      <a href="/about" className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold transition shadow-lg shadow-blue-500/20">
        Explore My Roadmap
      </a>
      <a href="#projects" className="px-8 py-3 border border-gray-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-white hover:bg-gray-100 dark:hover:bg-white/5 rounded-full font-bold transition flex items-center gap-2 text-gray-700 dark:text-white">
        <FileText size={18}/> View Projects
      </a>
    </div>
          </motion.div>
        </div>

        {/* RIGHT: Modern Profile Section */}
        <div className="flex-1 relative flex justify-center items-center py-10 md:py-0">
          
          {/* 1. Ambient Background Glow */}
          <motion.div 
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-tr from-blue-600/20 to-purple-600/20 rounded-full blur-[100px] -z-10"
          />

          {/* 2. Main Glass Card Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-[300px] h-[350px] md:w-[380px] md:h-[450px]"
          >
            {/* Border Gradient Line */}
            <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-blue-500/50 to-purple-600/50 blur-sm opacity-50" />
            
            {/* The Photo Frame - FIX 5: Added light mode background */}
            <div className="relative h-full w-full rounded-[2rem] overflow-hidden border border-white/20 dark:border-white/10 bg-white/30 dark:bg-slate-900/40 backdrop-blur-sm shadow-2xl">
              {/* REPLACE THIS SRC WITH YOUR PHOTO */}
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=crop&w=800&q=80" 
                alt="Profile" 
                className="w-full h-full object-cover opacity-95 dark:opacity-90 hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Gradient at bottom */}
              <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-gray-900/80 to-transparent dark:from-slate-900 dark:to-transparent" />
            </div>

            {/* 3. Floating "Tech Badges" */}
            
            {/* Badge A */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md p-3 rounded-xl border border-gray-200 dark:border-white/10 shadow-xl flex items-center gap-3"
            >
              <div className="bg-blue-500/10 dark:bg-blue-500/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                <Cpu size={24} />
              </div>
              <div>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-mono">Blockchain</p>
                <p className="text-sm font-bold text-gray-900 dark:text-white">Architect</p>
              </div>
            </motion.div>

            {/* Badge B */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -right-8 bottom-20 bg-white/90 dark:bg-slate-800/90 backdrop-blur-md p-4 rounded-xl border border-gray-200 dark:border-white/10 shadow-xl"
            >
              <div className="flex gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <div className="w-2 h-2 rounded-full bg-yellow-500" />
                <div className="w-2 h-2 rounded-full bg-green-500" />
              </div>
              <div className="space-y-1 font-mono text-[10px] text-gray-600 dark:text-gray-300">
                <p><span className="text-purple-600 dark:text-purple-400">const</span> <span className="text-yellow-600 dark:text-yellow-300">stack</span> = [</p>
                <p className="pl-2">"MERN", "PERN",</p>
                <p className="pl-2">"Solidity"</p>
                <p>];</p>
              </div>
            </motion.div>

            {/* Badge C */}
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, type: "spring" }}
              className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white text-gray-900 px-6 py-2 rounded-full font-bold shadow-lg shadow-blue-500/20 flex items-center gap-2 whitespace-nowrap"
            >
              <CheckCircle size={16} className="text-blue-600" />
              <span>Open for Work</span>
            </motion.div>

          </motion.div>

          {/* Floating Background Icons */}
          <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
             <OrbitIcon icon={<Code />} delay={0} radius={225} />
             <OrbitIcon icon={<Database />} delay={5} radius={225} />
             <OrbitIcon icon={<Globe />} delay={2} radius={165} />
          </div>
        </div>
      </section>

      <Skills />

      {/* Projects Section */}
      <section id="projects" className="relative max-w-7xl mx-auto px-6 py-20 scroll-mt-24">

        {/* Grid Background */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

        <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-4">
          {/* FIX 6: Updated text color */}
          <h2 className="text-3xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            Featured Projects
          </h2>

          {/* Filter Buttons */}
          <div className="flex gap-2 p-1 bg-gray-200 dark:bg-slate-800 rounded-lg">
            {['ALL', 'WEB3', 'PERN', 'MERN'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  filter === cat 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center p-20"><div className="animate-spin h-8 w-8 border-4 border-blue-500 rounded-full border-t-transparent"></div></div>
        ) : (
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
        
        {filteredProjects.length === 0 && !loading && (
          <p className="text-center text-gray-500 py-10">No projects found in this category.</p>
        )}
      </section>

      <Guestbook />
      <Contact />
    
    </div>
  )
}

export default Home;