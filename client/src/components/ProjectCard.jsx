import { motion } from 'framer-motion';
// Added GraduationCap and BookOpen
import { Github, ExternalLink, Layers, Code2, Database, Cpu, GraduationCap, BookOpen } from 'lucide-react';

const ProjectCard = ({ project }) => {
  
  // 1. Dynamic Styling based on Category (Now handles ALL 5 types)
  const getTheme = (cat) => {
    switch (cat) {
      case 'WEB3': return { 
        color: 'text-orange-600 dark:text-orange-400', 
        bg: 'bg-orange-500/10', 
        border: 'group-hover:border-orange-500/50', 
        shadow: 'group-hover:shadow-orange-500/20', 
        btnColor: '#f97316', // Orange-500
        icon: <Cpu size={16}/> 
      };
      case 'MERN': return { 
        color: 'text-green-600 dark:text-green-400', 
        bg: 'bg-green-500/10', 
        border: 'group-hover:border-green-500/50', 
        shadow: 'group-hover:shadow-green-500/20', 
        btnColor: '#22c55e', // Green-500
        icon: <Database size={16}/> 
      };
      case 'PERN': return { 
        color: 'text-blue-600 dark:text-blue-400', 
        bg: 'bg-blue-500/10', 
        border: 'group-hover:border-blue-500/50', 
        shadow: 'group-hover:shadow-blue-500/20', 
        btnColor: '#3b82f6', // Blue-500
        icon: <Layers size={16}/> 
      };
      // NEW: University (Purple)
      case 'UNIVERSITY': return { 
        color: 'text-purple-600 dark:text-purple-400', 
        bg: 'bg-purple-500/10', 
        border: 'group-hover:border-purple-500/50', 
        shadow: 'group-hover:shadow-purple-500/20', 
        btnColor: '#a855f7', // Purple-500
        icon: <GraduationCap size={16}/> 
      };
      // NEW: Self-Taught (Yellow/Amber)
      case 'SELF-TAUGHT': return { 
        color: 'text-yellow-600 dark:text-yellow-400', 
        bg: 'bg-yellow-500/10', 
        border: 'group-hover:border-yellow-500/50', 
        shadow: 'group-hover:shadow-yellow-500/20', 
        btnColor: '#eab308', // Yellow-500
        icon: <BookOpen size={16}/> 
      };
      // Default (Gray)
      default: return { 
        color: 'text-gray-600 dark:text-gray-400', 
        bg: 'bg-gray-500/10', 
        border: 'group-hover:border-gray-500/50', 
        shadow: 'group-hover:shadow-gray-500/20', 
        btnColor: '#6b7280', // Gray-500
        icon: <Code2 size={16}/> 
      };
    }
  };

  const theme = getTheme(project.category);

  return (
    <motion.div 
      layout
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`group relative bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 overflow-hidden transition-all duration-500 ${theme.border} hover:shadow-2xl ${theme.shadow}`}
    >
      
      {/* --- IMAGE SECTION --- */}
      <div className="relative h-56 overflow-hidden">
        <div className="absolute inset-0 bg-gray-900/5 dark:bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
        
        <img 
          src={project.imageUrl} 
          alt={project.title} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
        />

        {/* Category Badge */}
        <div className={`absolute top-4 left-4 z-20 backdrop-blur-md bg-white/90 dark:bg-slate-900/90 border border-gray-200 dark:border-slate-700 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-bold tracking-wider ${theme.color}`}>
          {theme.icon}
          {project.category}
        </div>
      </div>

      {/* --- CONTENT SECTION --- */}
      <div className="p-6 relative">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech, i) => (
            <span 
              key={i} 
              className="px-2.5 py-1 text-[11px] font-mono text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-md"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* --- FOOTER / LINKS --- */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-slate-800/50">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 dark:hover:bg-slate-700 text-gray-700 dark:text-gray-300 text-sm font-medium transition-all hover:text-gray-900 dark:hover:text-white"
            >
              <Github size={16} /> Code
            </a>
          )}
          
          {project.liveUrl && (
            <a 
              href={project.liveUrl} 
              target="_blank" 
              // FIX: Now uses theme.btnColor directly (much cleaner)
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-slate-900 text-sm font-bold transition-all ${theme.bg.replace('/10', '')} hover:opacity-90`}
              style={{ backgroundColor: theme.btnColor }}
            >
              <ExternalLink size={16} /> Live Demo
            </a>
          )}
        </div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-tr from-white/20 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    
    </motion.div>
  );
};

export default ProjectCard;