import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import API from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await API.post('/contact', formData);
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative scroll-mt-36">
      
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
          Let's Build <span className="text-blue-600 dark:text-blue-500">Together</span>
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          Have an idea? I can help you bring it to life on the blockchain.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT: Contact Info & Socials */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Info Card */}
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 backdrop-blur-sm shadow-sm dark:shadow-none">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Details</h3>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-500">
                  <Mail size={20} />
                </div>
                <span>feyselmifta982@gmail.com</span>
              </div>
              
              {/* IMPROVED LOCATION */}
              <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                <div className="w-10 h-10 bg-purple-100 dark:bg-purple-500/10 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-500">
                  <MapPin size={20} />
                </div>
                <span>Addis Ababa, Ethiopia (Open to Remote)</span>
              </div>
            </div>
          </div>

          {/* Socials Card */}
          <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-gray-200 dark:border-slate-800 backdrop-blur-sm shadow-sm dark:shadow-none">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Connect</h3>
            <div className="flex gap-4">
              
              {/* UPDATED LINKS */}
              <a 
                href="https://github.com/feysel2003" 
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-white transition-all"
              >
                <Github size={20} />
              </a>

              <a 
                href="https://linkedin.com/in/your-linkedin-profile" // You didn't provide this, update if needed
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-blue-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-blue-500 dark:text-gray-400 hover:bg-blue-200 dark:hover:bg-blue-500/10 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
              >
                <Linkedin size={20} />
              </a>

              <a 
                href="https://x.com/mifta_feys66399" 
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-400 hover:bg-black hover:text-white dark:hover:bg-black dark:hover:text-white transition-all"
              >
                <Twitter size={20} />
              </a>

            </div>
          </div>
        </motion.div>

        {/* RIGHT: The Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-xl dark:shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 blur-[80px] -z-10" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-600 dark:text-gray-400 font-medium ml-1">Your Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-600 dark:text-gray-400 font-medium ml-1">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-600 dark:text-gray-400 font-medium ml-1">Message</label>
              <textarea 
                rows="4"
                required
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-3 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg
                ${status === 'success' ? 'bg-green-600 text-white' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25 text-white'}
              `}
            >
              {status === 'loading' && <Loader2 className="animate-spin" />}
              {status === 'success' && <><CheckCircle /> Message Sent!</>}
              {status === 'idle' && <><Send size={18} /> Send Message</>}
              {status === 'error' && "Error - Try Again"}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;