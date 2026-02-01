import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Calendar, Search, ArrowRight, Hash, Terminal } from 'lucide-react';
import API from '../services/api';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await API.get('/posts');
        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  // Filter Logic
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    // FIX 1: Removed hardcoded bg-[#0f172a] and text-white
    <div className="min-h-screen pt-24 px-6 pb-20 relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-500/10 dark:bg-blue-600/10 blur-[120px] -z-10" />

      <div className="max-w-7xl mx-auto">
        
        {/* HEADER SECTION */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-center mb-4"
          >
            <div className="bg-white dark:bg-slate-900/50 border border-gray-200 dark:border-slate-700 rounded-full px-4 py-1.5 flex items-center gap-2 text-sm text-blue-600 dark:text-blue-400 font-mono shadow-sm">
              <Terminal size={14} />
              <span>/var/log/thoughts</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-gray-900 dark:text-white"
          >
            Engineering <span className="text-blue-600 dark:text-blue-500">Insights</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 dark:text-gray-400 mb-10"
          >
            Deep dives into Smart Contract Security, Database Architectures, and Full Stack Scalability.
          </motion.p>

          {/* Search Bar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-gray-400 dark:text-gray-500">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Search articles by title or tag..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border border-gray-200 dark:border-slate-700 rounded-2xl py-4 pl-12 pr-6 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-xl shadow-gray-200/50 dark:shadow-none"
            />
          </motion.div>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin h-10 w-10 border-4 border-blue-500 rounded-full border-t-transparent"></div>
          </div>
        )}

        {/* POSTS GRID */}
        {!loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-800 hover:border-blue-500/50 dark:hover:border-blue-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Image Area */}
                <div className="relative h-52 overflow-hidden">
                  <div className="absolute inset-0 bg-gray-900/5 dark:bg-slate-900/20 group-hover:bg-transparent transition-colors z-10" />
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Floating Date Badge */}
                  <div className="absolute top-4 right-4 z-20 bg-white/90 dark:bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-200 dark:border-slate-700 text-xs font-mono text-gray-600 dark:text-gray-300 flex items-center gap-2 shadow-sm">
                    <Calendar size={12} />
                    {new Date(post.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Content Area */}
                <div className="flex flex-col flex-grow p-6">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="flex items-center gap-1 text-[11px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-500/20">
                        <Hash size={10} /> {tag}
                      </span>
                    ))}
                  </div>

                  <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 leading-tight">
                    {post.title}
                  </h2>
                  
                  <div className="mt-auto pt-6 flex items-center justify-between text-sm border-t border-gray-100 dark:border-slate-800/50">
                    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-500">
                      <Clock size={16} />
                      <span>{post.readTime}</span>
                    </div>

                    <Link 
                      to={`/blog/${post.id}`}
                      className="flex items-center gap-2 font-bold text-gray-900 dark:text-white group-hover:translate-x-1 transition-transform"
                    >
                      Read Post <ArrowRight size={16} className="text-blue-600 dark:text-blue-500" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No articles found matching "{searchTerm}"</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear Search
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default Blog;