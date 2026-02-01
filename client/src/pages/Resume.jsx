import { Download, ExternalLink, Eye } from 'lucide-react';

const Resume = () => {
  const pdfUrl = "/resume.pdf";
  const imageUrl = "/resume.jpg"; // The screenshot you just made

  return (
    // FIX: Removed hardcoded bg-[#0f172a] and text-white.
    // Now relies on global styles, added explicit text colors for clarity.
    <div className="min-h-screen pt-24 px-6 flex flex-col items-center">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">My Resume</h1>
        <p className="text-gray-600 dark:text-gray-400">Preview below or download the accessible PDF.</p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <a 
          href={pdfUrl} 
          download="My_Professional_Resume.pdf"
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold flex items-center gap-2 transition shadow-lg shadow-blue-500/20"
        >
          <Download size={20} /> Download PDF
        </a>
        
        <a 
          href={pdfUrl} 
          target="_blank" 
          rel="noopener noreferrer"
          // FIX: Updated background, border, and text for Light/Dark modes
          className="px-8 py-3 bg-white dark:bg-slate-800 text-gray-900 dark:text-white border border-gray-300 dark:border-slate-600 hover:bg-gray-50 dark:hover:bg-slate-700 rounded-full font-bold flex items-center gap-2 transition"
        >
          <ExternalLink size={20} /> Open Raw File
        </a>
      </div>

      {/* VISUAL RESUME RENDER (The Image) */}
      <div className="w-full max-w-4xl bg-gray-100 dark:bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-gray-200 dark:border-slate-700 mb-20 relative group">
        
        {/* The Resume Image */}
        <img 
          src={imageUrl} 
          alt="Resume Preview" 
          className="w-full h-auto opacity-100 transition"
        />

        {/* Overlay (Shows "Click to View" on hover) */}
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center backdrop-blur-sm">
          <a 
            href={pdfUrl} 
            target="_blank"
            className="px-6 py-3 bg-white text-slate-900 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition duration-300"
          >
            <Eye size={20} /> View Full Quality
          </a>
        </div>
      </div>

    </div>
  );
};

export default Resume;