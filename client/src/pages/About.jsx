import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Code, GraduationCap, Award, Calendar, User, ExternalLink, Lightbulb, MapPin, Star } from 'lucide-react';
import API from '../services/api';
import SEO from '../components/SEO';
import Certifications from '../components/Certifications';

// Fallback data reflecting your specific story
const defaultTimeline = [
  {
    id: 1,
    year: "Year 4 (Current)",
    type: "University",
    title: "Software Engineering @ Wachemo University",
    description: "Currently a 4th-year student at WCU. Deepening my knowledge in Distributed Systems, Advanced Algorithms, and preparing for the final year Capstone Project.",
    instructor: "Wachemo University",
    skills: ["Software Architecture", "System Design", "Advanced Java", "Research"],
    projectTitle: "University Systems (Upcoming)"
  },
  {
    id: 2,
    year: "Self-Development",
    type: "Self-Taught",
    title: "The Full Stack & Web3 Leap",
    description: "While acing university courses, I enrolled in Dr. Angela Yu's top-rated Bootcamp on Udemy. I realized the power of Decentralization and mastered the MERN stack and Solidity.",
    instructor: "Dr. Angela Yu (Udemy)",
    skills: ["React.js", "Node.js", "Solidity", "Ether.js", "MongoDB"],
    projectTitle: "DeFi Token Exchange"
  },
  {
    id: 3,
    year: "2015 E.C.",
    type: "Achievement",
    title: "University Entrance Excellence",
    description: "Scored >500 in the National Higher Education Entrance Exam. This was the first historical batch administered strictly within universities under the new education reforms. Awarded by the Regional State for academic excellence.",
    instructor: "Ministry of Education",
    skills: ["Critical Thinking", "Discipline", "Mathematics", "Physics"],
    projectTitle: "Regional Award Winner"
  },
  {
    id: 4,
    year: "2014 E.C.",
    type: "Education",
    title: "Secondary School Completion",
    description: "Graduated from Abaferansua Secondary School in Wolkite (Gubre Sub-city). Built the foundation for my engineering career with a strong focus on natural sciences.",
    instructor: "Abaferansua Secondary School",
    skills: ["Physics", "Chemistry", "Math", "Logic"],
    projectTitle: "High School Diploma"
  }
];

const About = () => {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/journey');
        if (res.data.length > 0) {
          setTimelineData(res.data);
        } else {
          setTimelineData(defaultTimeline);
        }
      } catch (error) {
        console.error("Error fetching journey, using default", error);
        setTimelineData(defaultTimeline);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // SEO Schema
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Feysel Mifta",
    "jobTitle": "Software Engineering Student & Full Stack Developer",
    "birthDate": "2003",
    "birthPlace": { "@type": "Place", "name": "Wolkite, Gurage Zone, Ethiopia" },
    "alumniOf": [{ "@type": "CollegeOrUniversity", "name": "Wachemo University" }],
    "award": "Regional State Award for Academic Excellence (>500 Score)",
    "knowsAbout": ["Software Engineering", "MERN Stack", "Web3", "Solidity", "Java", "C++"]
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      
      <SEO 
        title="About Feysel Mifta | Journey & Achievements"
        description="The story of Feysel Mifta: From top-scoring student in Wolkite to Full Stack Web3 Engineer at Wachemo University."
        schema={personSchema}
      />

      <div className="max-w-5xl mx-auto">
        
        {/* HERO / BIO SECTION */}
        <div className="mb-20 grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white">
              From <span className="text-blue-600 dark:text-blue-500">Wolkite</span> to the World.
            </h1>
            
            <div className="space-y-4 text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              <p>
                I am a <strong>22-year-old Software Engineer student </strong>at wcu , born in the Gurage Zone (Central Ethiopia Regional State). My journey began at <strong>Abaferansua Secondary School</strong> in Gubre, where I developed a passion for solving complex problems.
              </p>
              <p>
                In 2015 E.C., I proved my dedication by scoring <strong>over 500</strong> in the National University Entrance Exam—ranking among the top students in the first rigorous cohort under the new Ministry of Education reforms. This achievement earned me a <strong>Regional State Award</strong> and paved my way to <strong>Wachemo University (WCU)</strong>.
              </p>
              <p>
                Currently a <strong>4th-Year Engineering Student</strong>, I don't just rely on the curriculum. I am an active student of <strong>Dr. Angela Yu</strong> (the world's highest-rated coding instructor), bridging the gap between academic theory and modern <strong>Full Stack & Web3</strong> development.
              </p>
            </div>

            {/* Location Badge */}
            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400">
              <MapPin size={18} className="text-red-500" />
              Addis Ababa / Wolkite, Ethiopia
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="absolute inset-0 bg-blue-600/10 rounded-2xl transform rotate-3"></div>
            
            {/* PROFILE / AWARD PHOTO */}
            <img 
              src="https://res.cloudinary.com/dosln7f10/image/upload/v1770140345/photo_2026-02-02_17-49-21_gf4zsw.jpg" 
              alt="Feysel Mifta Academic Achievement" 
              className="relative w-full h-auto rounded-2xl shadow-2xl border border-gray-200 dark:border-slate-700 transform -rotate-2 hover:rotate-0 transition duration-500"
            />
          </motion.div>
        </div>

        {/* TIMELINE HEADER */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">My Engineering Roadmap</h2>
          <p className="text-gray-500 dark:text-gray-400">The journey from High School Excellence to Software Engineer.</p>
        </div>

        {/* LOADING STATE */}
        {loading && <div className="text-center text-gray-500 py-10">Loading Timeline...</div>}

        {/* TIMELINE GRID */}
        <div className="relative border-l-2 border-gray-200 dark:border-slate-800 ml-4 md:ml-10 space-y-12">
          
          {!loading && timelineData.map((item, index) => (
            <motion.div 
              key={item.id || index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative pl-8 md:pl-12"
            >
              {/* Icon Dot Logic */}
              <div className={`absolute -left-[9px] top-0 w-5 h-5 rounded-full border-4 border-white dark:border-[#0f172a] 
                ${item.type === 'University' ? 'bg-blue-600' : 
                  item.type === 'Achievement' ? 'bg-yellow-500' : 'bg-green-500'}`} 
              />

              <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all group">
                
                {/* Top Row: Type & Title */}
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider 
                      ${item.type === 'University' ? 'bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-400' : 
                        item.type === 'Achievement' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-500/20 dark:text-yellow-400' :
                        'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400'
                      }`}>
                      {item.type === 'University' ? <><GraduationCap size={12} className="inline mr-1"/> Academic</> : 
                       item.type === 'Achievement' ? <><Star size={12} className="inline mr-1"/> Milestone</> : 
                       <><BookOpen size={12} className="inline mr-1"/> Self-Taught</>}
                    </span>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 text-gray-500 text-sm font-mono bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded">
                    <Calendar size={14} /> {item.year}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                  {item.description}
                </p>

                {/* Instructor Line */}
                {item.instructor && (
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
                    <Lightbulb size={16} className="text-yellow-500" /> 
                    <span>Institution/Mentor: <span className="font-semibold text-gray-800 dark:text-gray-200">{item.instructor}</span></span>
                  </div>
                )}

                {/* Footer: Skills & Project */}
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-1"><Award size={14}/> Skills Acquired</h4>
                    <div className="flex flex-wrap gap-2">
                      {item.skills && item.skills.map((skill, i) => (
                        <span key={i} className="text-xs bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-md border border-gray-200 dark:border-slate-700">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  {item.projectTitle && (
                    <div className="flex-1">
                      <h4 className="text-xs font-bold text-gray-400 uppercase mb-3 flex items-center gap-1"><Code size={14}/> Major Output</h4>
                      
                      {item.projectLink && item.projectLink !== '#' ? (
                        <a href={item.projectLink} target="_blank" className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg font-medium hover:bg-blue-100 dark:hover:bg-blue-900/40 transition">
                          {item.projectTitle} <ExternalLink size={14} />
                        </a>
                      ) : (
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-gray-400 rounded-lg font-medium">
                          {item.projectTitle}
                        </div>
                      )}
                    </div>
                  )}
                </div>

              </div>
            </motion.div>
          ))}
        </div>
        
        {/* CERTIFICATIONS SECTION (Imported Component) */}
        <Certifications />

        {/* LOOKING FORWARD */}
        <div className="mt-20 text-center bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/10 dark:to-purple-900/10 p-10 rounded-3xl border border-blue-100 dark:border-blue-500/20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">The Road Ahead</h3>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            With a strong foundation in Engineering principles and practical Modern Web skills, I am now focused on solving real-world problems in Ethiopia using **Scalable Software Architectures** and **Blockchain Technology**.
          </p>
        </div>

      </div>
    </div>
  );
};

export default About;