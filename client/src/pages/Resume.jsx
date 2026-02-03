import { useState } from 'react';
import { Download, ExternalLink, Eye, X, Calendar, CheckCircle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Resume = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // CONFIG: Add your resume page images here
  const resumePages = [
    "/resume.jpg" 
    // Add "/resume-p3.jpg" if needed
  ]; 
  const pdfUrl = "/resume.pdf"; 

  // Toggle Modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen pt-24 px-6 flex flex-col items-center pb-20">
      
      {/* 1. Header & Metadata */}
      <div className="text-center mb-8 max-w-2xl">
        <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Professional Resume</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          A summary of my academic background, technical skills, and project experience.
        </p>
        
        {/* Status Bar */}
        <div className="flex flex-wrap justify-center gap-4 text-xs font-mono text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1 bg-gray-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-gray-200 dark:border-slate-700">
            <Calendar size={12} /> Last Updated: Feb 2026
          </span>
          <span className="flex items-center gap-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 px-3 py-1 rounded-full border border-green-200 dark:border-green-800">
            <CheckCircle size={12} /> Open to Work
          </span>
        </div>
      </div>

      {/* 2. Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <a 
          href={pdfUrl} 
          download="Feysel_Mifta_Resume.pdf" 
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center gap-2 transition shadow-lg shadow-blue-500/20 hover:-translate-y-1"
        >
          <Download size={18} /> Download PDF
        </a>
        
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          className="px-6 py-3 bg-white dark:bg-slate-800 text-gray-700 dark:text-white border border-gray-300 dark:border-slate-600 hover:border-blue-500 dark:hover:border-blue-400 rounded-full font-bold flex items-center gap-2 transition hover:-translate-y-1"
        >
          <ExternalLink size={18} /> Open Raw File
        </a>

        <button 
          onClick={openModal}
          className="px-6 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 border border-transparent hover:border-gray-300 dark:hover:border-slate-600 rounded-full font-bold flex items-center gap-2 transition hover:-translate-y-1"
        >
          <Eye size={18} /> Quick Preview
        </button>
      </div>

      {/* 3. Visual Preview (Multi-Page Loop) */}
      <div className="w-full max-w-4xl space-y-6 mb-8">
        {resumePages.map((page, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-gray-100 dark:bg-slate-900 rounded-xl overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700 relative group cursor-pointer"
            onClick={openModal}
          >
            {/* The Resume Page Image */}
            <img 
              src={page} 
              alt={`Resume Page ${index + 1}`} 
              className="w-full h-auto opacity-95 group-hover:opacity-100 transition duration-500"
            />

            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]">
              <div className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition duration-300 shadow-xl">
                <Eye size={20} /> Click to Expand
              </div>
            </div>

            {/* Page Number Badge */}
            <div className="absolute top-4 right-4 bg-black/50 text-white text-[10px] px-2 py-1 rounded backdrop-blur-md border border-white/10">
              Page {index + 1} of {resumePages.length}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Scroll Indicator (Only if multiple pages) */}
      {resumePages.length > 1 && (
        <div className="flex flex-col items-center text-gray-400 animate-bounce">
          <p className="text-xs font-bold uppercase tracking-widest">End of Document</p>
          <ChevronDown size={20} />
        </div>
      )}

      {/* 4. Lightbox Modal (Scrollable for Multi-Page) */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[10000] flex justify-center bg-black/95 backdrop-blur-md p-0 md:p-8 overflow-y-auto"
            onClick={closeModal}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="fixed top-6 right-6 z-[10001] p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition"
            >
              <X size={32} />
            </button>

            {/* Scrollable Container for Images */}
            <div className="w-full max-w-4xl space-y-4 my-auto" onClick={(e) => e.stopPropagation()}>
              {resumePages.map((page, index) => (
                <motion.img 
                  key={index}
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  src={page} 
                  alt={`Full Page ${index + 1}`} 
                  className="w-full h-auto rounded-sm shadow-2xl shadow-black border border-white/10"
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Resume;