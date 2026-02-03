import { useEffect, useState } from 'react'; // <--- Import Hooks
import { Github, Linkedin, Twitter, ArrowUp, Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import API from '../services/api'; // <--- Import API Helper

const Footer = () => {
  const [latestProjects, setLatestProjects] = useState([]);

  // Fetch Projects on Mount
  useEffect(() => {
    const fetchLatestWork = async () => {
      try {
        const res = await API.get('/projects');
        // Take only the first 3 projects (Newest first)
        setLatestProjects(res.data.slice(0, 3));
      } catch (error) {
        console.error("Error fetching footer projects:", error);
      }
    };
    fetchLatestWork();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white dark:bg-[#0b1120] border-t border-gray-200 dark:border-slate-800 text-gray-600 dark:text-gray-400 pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
              <span className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-sm text-white">F.M</span>
              Portfolio.
            </h2>
            <p className="text-sm leading-relaxed">
              Crafting scalable, decentralized web applications for the future internet. Specialized in MERN, PERN, and Web3 technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">Navigation</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Home</Link></li>
              <li><Link to="/about" className="hover:text-blue-600 dark:hover:text-blue-400 transition">About Me</Link></li>
              <li><Link to="/resume" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Resume</Link></li>
              <li><Link to="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition">Technical Blog</Link></li>
            </ul>
          </div>

          {/* Projects (DYNAMIC NOW) */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">Latest Work</h3>
            <ul className="space-y-3 text-sm">
              {latestProjects.length > 0 ? (
                latestProjects.map((project) => (
                  <li key={project.id}>
                    <a 
                      href={project.liveUrl || project.githubUrl || "#"} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="group flex items-center gap-2 hover:text-blue-600 dark:hover:text-blue-400 transition"
                    >
                      <span className="truncate max-w-[150px]">{project.title}</span>
                      <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  </li>
                ))
              ) : (
                <li className="text-gray-400 italic">Loading projects...</li>
              )}
              
              {/* 'View All' Link */}
              <li className="pt-2">
                <a href="/#projects" className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider hover:underline">
                  View All Projects &rarr;
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 dark:text-white font-bold mb-4">Connect</h3>
            <div className="flex gap-4 mb-4">
              <a href="https://github.com/feysel2003" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition">
                <Github size={18}/>
              </a>
              <a href="#" className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-blue-600 dark:hover:text-white transition">
                <Linkedin size={18}/>
              </a>
              <a href="https://x.com/mifta_feys66399" target="_blank" rel="noreferrer" className="w-10 h-10 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-sky-500 dark:hover:text-white transition">
                <Twitter size={18}/>
              </a>
            </div>
            <a href="mailto:feyselmifta982@gmail.com" className="flex items-center gap-2 text-sm hover:text-gray-900 dark:hover:text-white transition">
              <Mail size={16} /> feyselmifta982@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Feysel Mifta. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6 text-xs font-mono text-gray-500 dark:text-gray-500">
            <span>Built with: React • Node • Solidity</span>
          </div>

          <button 
            onClick={scrollToTop}
            className="flex items-center gap-2 text-sm hover:text-blue-600 dark:hover:text-blue-400 transition"
          >
            Back to Top <ArrowUp size={16} />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;