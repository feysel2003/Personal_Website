import { useEffect, useState } from 'react';
import { Download, Briefcase, GraduationCap, Calendar, Award, ChevronRight, Terminal, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';
import API from '../services/api';

const Resume = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const pdfUrl = "/resume.pdf";

  useEffect(() => {
    API.get('/resume')
      .then(res => setItems(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const education = items.filter(i => i.type === 'Education');
  const experience = items.filter(i => i.type === 'Experience');

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen pt-28 px-6 pb-20 relative overflow-hidden">
      
      {/* Background Tech Grid (Subtle) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      {/* 1. Header */}
      <div className="text-center mb-20 max-w-3xl mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: -20 }} 
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-mono font-bold mb-6 border border-blue-100 dark:border-blue-800"
        >
          <Terminal size={14} /> SYSTEM.LOG(CAREER)
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white tracking-tight"
        >
          Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Experience</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-lg text-gray-600 dark:text-gray-400 mb-10"
        >
           A timeline of my professional career and academic background, showcasing my growth, skills, and impact in the tech industry.
        </motion.p>
        
        <motion.a 
          whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
          href={pdfUrl} 
          download="Feysel_Mifta_Resume.pdf" 
          className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl font-bold shadow-2xl hover:shadow-blue-500/20 transition-all"
        >
          <Download size={20} /> Download Official PDF
        </motion.a>
      </div>

      {/* 2. The Timeline Grid */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 relative z-10">
        
        {/* --- LEFT COLUMN: EXPERIENCE --- */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-2xl bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-lg shadow-blue-500/10">
              <Briefcase size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Experience</h2>
          </div>

          <div className="relative border-l-2 border-blue-200 dark:border-blue-900/30 ml-4 space-y-12 pb-4">
            {experience.map((item, index) => (
              <TimelineCard 
                key={item.id} 
                item={item} 
                color="blue" 
                icon={<Cpu size={16}/>} 
              />
            ))}
          </div>
        </motion.div>

        {/* --- RIGHT COLUMN: EDUCATION --- */}
        <motion.div variants={containerVariants} initial="hidden" animate="visible">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 shadow-lg shadow-emerald-500/10">
              <GraduationCap size={28} />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Education</h2>
          </div>

          <div className="relative border-l-2 border-emerald-200 dark:border-emerald-900/30 ml-4 space-y-12 pb-4">
             {education.map((item, index) => (
              <TimelineCard 
                key={item.id} 
                item={item} 
                color="emerald" 
                icon={<Award size={16}/>} 
              />
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
};

// --- MODERN CARD COMPONENT ---
const TimelineCard = ({ item, color, icon }) => {
  // Dynamic Color Classes
  const colors = {
    blue: {
      dot: "bg-blue-500 shadow-blue-500/50",
      border: "hover:border-blue-500/50 dark:hover:border-blue-500/50",
      text: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/10",
      badge: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
    },
    emerald: {
      dot: "bg-emerald-500 shadow-emerald-500/50",
      border: "hover:border-emerald-500/50 dark:hover:border-emerald-500/50",
      text: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-900/10",
      badge: "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300"
    }
  };
  
  const theme = colors[color];

  return (
    <motion.div 
      variants={{ hidden: { opacity: 0, x: -20 }, visible: { opacity: 1, x: 0 } }}
      className="relative pl-10"
    >
      {/* 1. The Glowing Node */}
      <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-[#0f172a] ${theme.dot} shadow-[0_0_15px_rgba(0,0,0,0.3)] z-10`} />
      
      {/* 2. The Connector Line (Visual only) */}
      <div className={`absolute left-[10px] top-5 w-8 h-0.5 ${theme.bg} z-0`} />

      {/* 3. The Card */}
      <div className={`relative bg-white dark:bg-slate-900/60 backdrop-blur-sm p-6 rounded-2xl border border-gray-200 dark:border-slate-800 ${theme.border} transition-all duration-300 hover:shadow-xl group`}>
        
        {/* Date Badge */}
        <div className="flex justify-between items-start mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold font-mono ${theme.badge}`}>
            <Calendar size={12} /> {item.startDate} — {item.endDate}
          </span>
          <div className={`opacity-0 group-hover:opacity-100 transition-opacity ${theme.text}`}>
            {icon}
          </div>
        </div>

        {/* Content */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:translate-x-1 transition-transform">
          {item.title}
        </h3>
        <p className={`font-medium mb-4 ${theme.text}`}>
          {item.organization}
        </p>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
          {item.description}
        </p>

        {/* Tech Stack Pills */}
        {item.technologies && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-slate-800/50">
            {item.technologies.split(',').map((tech, i) => (
              <span key={i} className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-slate-700 flex items-center gap-1">
                <ChevronRight size={10} className={color === 'blue' ? "text-blue-500" : "text-emerald-500"} />
                {tech.trim()}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Resume;