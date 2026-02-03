import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import API from '../services/api';

const Certifications = () => {
  const [certs, setCerts] = useState([]);

  useEffect(() => {
    API.get('/certifications').then(res => setCerts(res.data));
  }, []);

  if (certs.length === 0) return null;

  return (
    <section className="py-20">
      <h2 className="text-3xl font-bold mb-10 flex items-center gap-2 text-gray-900 dark:text-white">
        <Award className="text-yellow-500" /> Licenses & Certifications
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {certs.map((cert, index) => (
          <motion.div
            key={cert.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex gap-4 items-start"
          >
            {/* Logo Placeholder or Image */}
            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
              {cert.imageUrl ? (
                <img src={cert.imageUrl} alt={cert.issuer} className="w-full h-full object-cover" />
              ) : (
                <Award className="text-blue-500" size={32} />
              )}
            </div>

            <div className="flex-1">
              <h3 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {cert.issuer}
              </p>
              
              <div className="flex items-center justify-between mt-4">
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar size={12} /> Issued {cert.date}
                </span>
                
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs font-bold rounded-lg flex items-center gap-1 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition"
                  >
                    Show Credential <ExternalLink size={12} />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Certifications;