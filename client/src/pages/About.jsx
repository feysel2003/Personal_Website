import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, GraduationCap, Award, Calendar, User, ExternalLink } from 'lucide-react';
import API from '../services/api';
import Certifications from '../components/Certifications';

const About = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/journey');
        setTimelineData(res.data);
      } catch (error) {
        console.error("Error fetching journey");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      <div className="max-w-5xl mx-auto">
        
        {/* Header / Bio */}
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              More Than Just <span className="text-blue-600 dark:text-blue-500">Code.</span>
            </h1>
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I am a <strong> Software Engineering student</strong> enrolled in a rigorous 5-year program in Ethiopia. My academic life focuses on the *science* of computing—Algorithms, Math, and Low-level logic.
              </p>
              <p>
                However, I realized early on that university theory moves slower than the tech industry. To bridge that gap, I became a <strong>self-taught developer</strong>.
              </p>
              <p>
                Through resources like <strong>Dr. Angela Yu's Bootcamp</strong> and <strong>FreeCodeCamp</strong>, I mastered the MERN stack. Recently, my passion for financial freedom and open systems led me to <strong>Web3 and Blockchain</strong> development.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-600/10 rounded-2xl transform rotate-3"></div>
            <img 
              src="https://res.cloudinary.com/dosln7f10/image/upload/v1770140345/photo_2026-02-02_17-49-21_gf4zsw.jpg" 
              alt="Engineering Student" 
              className="relative  rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 transform -rotate-2 hover:rotate-0 transition duration-500"
            />
          </motion.div>
        </div>

        {/* Timeline Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Engineering Roadmap</h2>
          <p className="text-gray-500 dark:text-gray-400">The 5-Year Journey: From Hello World to Decentralized Systems.</p>
        </div>


        {/* Loading State */}
        {loading && <div className="text-center text-gray-500">Loading Timeline...</div>}

        {/* Timeline Grid */}
        <div className="relative border-l-2 border-gray-200 dark:border-slate-800 ml-4 md:ml-10 space-y-12">
          
          {!loading && timelineData.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Icon Dot */}
              <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-[#0f172a] ${item.type === 'University' ? 'bg-blue-600' : 'bg-green-500'}`} />

              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                
                {/* Top Row: Type & Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${
                      item.type === 'University' 
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' 
                        : 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                    }`}>
                      {item.type === 'University' ? <><GraduationCap size={12} className="inline mr-1"/> University</> : <><BookOpen size={12} className="inline mr-1"/> Self-Taught</>}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">{item.title}</h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-mono">
                    <Calendar size={14} /> {item.year}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                  {item.description}
                </p>

                {/* Instructor (New Feature) */}
                {item.instructor && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <User size={14} /> 
                    <span>Instructor: <span className="font-semibold text-gray-700 dark:text-gray-200">{item.instructor}</span></span>
                  </div>
                )}

                {/* Footer: Skills & Project */}
                <div className="flex flex-col md:flex-row gap-6 pt-4 border-t border-gray-100 dark:border-slate-800">
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1"><Award size={12}/> Skills Acquired</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-2 py-1 rounded">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {item.projectTitle && (
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-2 flex items-center gap-1"><Code size={12}/> Key Project</h4>
                      
                      {item.projectLink ? (
                        <a href={item.projectLink} target="_blank" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                          {item.projectTitle} <ExternalLink size={12} />
                        </a>
                      ) : (
                        <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {item.projectTitle}
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}

          {!loading && timelineData.length === 0 && <p className="text-center text-gray-500">No timeline entries yet. Add them in Admin!</p>}

        </div>
        
        <Certifications />

        {/* Looking Forward */}
        <div className="mt-20 text-center bg-blue-50 dark:bg-blue-900/10 p-8 rounded-2xl border border-blue-100 dark:border-blue-500/20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Looking Ahead (Year 4 & 5)</h3>
          <p className="text-gray-600 dark:text-gray-300">
            Upcoming focus on Distributed Systems, AI integration, and the Final Year Capstone Project.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;