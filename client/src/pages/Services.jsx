import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Smartphone, Globe, Server, Cpu, PenTool, Check } from 'lucide-react';
import API from '../services/api';
// We don't need 'Link' anymore for the contact button, we use <a> for hash navigation
// but we might use it for other things, so keep it if needed, or remove if unused.

// Icon Map
const iconMap = {
  Code: <Code size={32} />,
  Smartphone: <Smartphone size={32} />,
  Globe: <Globe size={32} />,
  Server: <Server size={32} />,
  Cpu: <Cpu size={32} />,
  PenTool: <PenTool size={32} />
};

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/services')
      .then(res => setServices(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 px-6 pb-20">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gray-900 dark:text-white">
            What I <span className="text-blue-600 dark:text-blue-500">Offer</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Professional engineering services for modern businesses and startups. 
            From Full Stack Web Apps to Secure Smart Contracts.
          </p>
        </motion.div>
      </div>

      {loading && <div className="text-center text-gray-500">Loading Services...</div>}

      {/* Grid */}
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!loading && services.map((service, index) => (
          <motion.div 
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group hover:shadow-2xl hover:shadow-blue-500/10"
          >
            {/* Icon */}
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
              {iconMap[service.icon] || <Code size={32}/>}
            </div>

            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
              {service.title}
            </h3>
            
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {service.description}
            </p>

            {/* Features List */}
            <ul className="space-y-2 mb-8">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                  <Check size={16} className="text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>

            {/* Price & CTA */}
            <div className="pt-6 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <span className="text-sm font-bold text-gray-500 dark:text-gray-400">
                {service.price || "Contact for Quote"}
              </span>
              
              {/* FIX: Changed Link to <a> tag pointing to /#contact */}
              <a 
                href="/#contact" 
                className="text-blue-600 dark:text-blue-400 font-bold hover:underline flex items-center gap-1"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        ))}
      </div>

      {!loading && services.length === 0 && (
        <p className="text-center text-gray-500">No services listed yet.</p>
      )}

    </div>
  );
};

export default Services;