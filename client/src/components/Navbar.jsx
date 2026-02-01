import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, Laptop, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Mobile Menu State
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'system');
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const location = useLocation();

  // 1. THEME LOGIC
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Links Configuration
  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Resume', path: '/resume' },
    { name: 'Blog', path: '/blog' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed w-full z-[9999] bg-white/80 dark:bg-[#0f172a]/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30 group-hover:scale-105 transition-transform">
            P.
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            Portfolio
          </span>
        </Link>

        {/* DESKTOP NAVIGATION */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link 
              key={link.path} 
              to={link.path} 
              className={`relative text-sm font-medium transition-colors ${
                isActive(link.path) 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400'
              }`}
            >
              {link.name}
              {isActive(link.path) && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400 rounded-full"
                />
              )}
            </Link>
          ))}
        </div>

        {/* ACTIONS (Theme + Wallet + Hamburger) */}
        <div className="flex items-center gap-4">
          
          {/* Theme Toggle Dropdown */}
          <div className="relative">
            <button 
              onClick={() => setShowThemeMenu(!showThemeMenu)}
              className="p-2 rounded-lg bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700 transition"
            >
              {theme === 'light' && <Sun size={20} />}
              {theme === 'dark' && <Moon size={20} />}
              {theme === 'system' && <Laptop size={20} />}
            </button>

            <AnimatePresence>
              {showThemeMenu && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 top-12 w-36 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-gray-200 dark:border-slate-700 overflow-hidden"
                >
                  {[
                    { id: 'light', icon: <Sun size={16}/>, label: 'Light' },
                    { id: 'dark', icon: <Moon size={16}/>, label: 'Dark' },
                    { id: 'system', icon: <Laptop size={16}/>, label: 'System' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => { setTheme(item.id); setShowThemeMenu(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-800 transition ${
                        theme === item.id ? 'text-blue-600 dark:text-blue-400' : 'text-gray-600 dark:text-gray-400'
                      }`}
                    >
                      {item.icon} {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Connect Button (Hidden text on mobile to save space) */}
          <div className="hidden sm:block">
            <ConnectButton showBalance={false} chainStatus="icon" accountStatus="avatar" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 dark:text-white"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: '100vh', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden absolute top-20 left-0 w-full bg-white dark:bg-[#0f172a] border-t border-gray-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="flex flex-col items-center justify-center gap-8 p-10">
              {links.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-2xl font-bold text-gray-800 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-8 border-t border-gray-200 dark:border-slate-800 w-full flex justify-center">
                 {/* Show full connect button on mobile menu */}
                 <ConnectButton showBalance={false} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;