import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, Loader2, Mail, MapPin, Linkedin, Github, Twitter, MessageSquare } from 'lucide-react';
import API from '../services/api';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    const emailParams = {
      name: formData.name,
      email: formData.email,
      message: formData.message,
    };

    try {
      // 1. Send Email (Frontend - EmailJS)
      const serviceID = "service_owlb2gr"; 
      const templateID = "template_crrsfxv"; 
      const publicKey = "N2AkoFNaGXcwoRo7_";   

      
      await emailjs.send(serviceID, templateID, emailParams, publicKey);

      // 2. Save to Database (Backend)
      await API.post('/contact', formData);

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error("Contact Error:", error);
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-7xl mx-auto relative scroll-mt-24">
      
      {/* Header */}
      <div className="text-center mb-16 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-bold mb-6">
          <MessageSquare size={16} /> Let's Talk
        </div>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white leading-tight">
          Ready to transform your vision into <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-500">Reality?</span>
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Whether you need a web App, a scalable backend, or a full-stack overhaul, I am ready to help. 
          Let's discuss how we can build something extraordinary together.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        
        {/* LEFT: Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          {/* Card 1: Direct Contact */}
          <div className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Get in Touch</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                  <Mail size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email Me At</p>
                  <a href="mailto:feyselmifta982@gmail.com" className="text-lg font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
                    feyselmifta982@gmail.com
                  </a>
                </div>
              </div>
              
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-500/10 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                  <MapPin size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Location</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">
                    Addis Ababa, Ethiopia
                  </p>
                  <p className="text-xs text-green-600 dark:text-green-400 font-medium mt-1 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/> Available for Remote Work
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Socials */}
          <div className="bg-white dark:bg-slate-900/50 p-8 rounded-2xl border border-gray-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Connect on Socials</h3>
            <div className="flex gap-4">
              {[
                { icon: <Github size={24} />, href: "https://github.com/feysel2003", label: "GitHub", color: "hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black" },
                { icon: <Linkedin size={24} />, href: "https://linkedin.com/in/your-linkedin-profile", label: "LinkedIn", color: "hover:bg-[#0077b5] hover:text-white" },
                { icon: <Twitter size={24} />, href: "https://x.com/mifta_feys66399", label: "X / Twitter", color: "hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black" }
              ].map((social, i) => (
                <a 
                  key={i} 
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className={`w-14 h-14 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400 transition-all duration-300 ${social.color}`}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </motion.div>

        {/* RIGHT: Form */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-slate-900 p-8 md:p-10 rounded-3xl border border-gray-200 dark:border-slate-700 shadow-xl dark:shadow-2xl relative overflow-hidden"
        >
          {/* Decorative Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/10 blur-[80px] -z-10" />

          <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Your Name</label>
              <input 
                type="text" 
                required
                placeholder="feysel M"
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-4 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Email Address</label>
              <input 
                type="email" 
                required
                placeholder="feysel@example.com"
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-4 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 ml-1">Message</label>
              <textarea 
                rows="5"
                required
                placeholder="Tell me about your project..."
                className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 rounded-xl p-4 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition resize-none"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={status === 'loading' || status === 'success'}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-all shadow-lg hover:-translate-y-1 duration-300
                ${status === 'success' 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-blue-500/25 text-white'}
              `}
            >
              {status === 'loading' ? (
                <><Loader2 className="animate-spin" /> Sending...</>
              ) : status === 'success' ? (
                <><CheckCircle /> Message Sent!</>
              ) : (
                <><Send size={18} /> Send Message</>
              )}
            </button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;