import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Clock, Hash, CheckCircle2, Coffee, Box } from 'lucide-react';

// 1. Helper: Generate Unique Gradient Avatar
const generateAvatar = (address) => {
  const colors = [
    'from-pink-500 to-rose-600', 'from-blue-500 to-indigo-600', 
    'from-emerald-400 to-green-600', 'from-amber-400 to-orange-600', 
    'from-violet-500 to-purple-700', 'from-cyan-400 to-blue-500'
  ];
  const index = parseInt(address.slice(-2), 16) % colors.length;
  return colors[index];
};

// 2. Helper: Calculate "Time Ago" (e.g. "5 mins ago")
const timeAgo = (timestamp) => {
  const seconds = Math.floor((new Date() - new Date(Number(timestamp) * 1000)) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " mins ago";
  return "Just now";
};

const BlockchainFeed = ({ entries }) => {
  return (
    <div className="bg-white/50 dark:bg-slate-900/50 rounded-3xl border border-gray-200 dark:border-slate-800 backdrop-blur-md overflow-hidden shadow-2xl">
      
      {/* Header: Simulated Terminal Top Bar */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/50 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <span className="ml-3 text-xs font-mono text-gray-500 font-bold uppercase tracking-wider">
            Live Transaction Feed
          </span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-green-600 dark:text-green-400">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          Network Active
        </div>
      </div>

      {/* The Scrollable Feed */}
      <div className="max-h-[600px] overflow-y-auto p-4 custom-scrollbar space-y-3">
        <AnimatePresence mode='popLayout'>
          {entries && [...entries].reverse().map((entry, index) => (
            <motion.div
              layout
              initial={{ opacity: 0, x: -20, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              key={index}
              className={`relative group p-4 rounded-xl border transition-all duration-300
                ${entry.hasTipped 
                  ? 'bg-amber-50/50 dark:bg-amber-900/10 border-amber-200 dark:border-amber-700/30' 
                  : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-slate-600'}
              `}
            >
              {/* Connector Line for Tree View effect */}
              {index !== entries.length - 1 && (
                <div className="absolute left-[2.25rem] top-12 bottom-[-1.5rem] w-px bg-gray-200 dark:bg-slate-800 z-0" />
              )}

              <div className="flex gap-4 relative z-10">
                {/* Avatar */}
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${generateAvatar(entry.user)} shadow-inner flex items-center justify-center text-white font-bold text-xs`}>
                  {entry.user.slice(2,4)}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-gray-100 dark:bg-slate-950 border border-gray-200 dark:border-slate-800 text-[10px] font-mono text-blue-600 dark:text-blue-400">
                        {entry.user.slice(0, 6)}...{entry.user.slice(-4)}
                      </span>
                      {entry.hasTipped && (
                        <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-500/20 text-[10px] font-bold text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/30">
                          <Coffee size={10} /> +0.002 ETH
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                      <Clock size={10} />
                      {timeAgo(entry.timestamp)}
                    </div>
                  </div>

                  {/* Message Content */}
                  <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                    "{entry.message}"
                  </p>

                  {/* Footer Actions */}
                  <div className="mt-3 flex items-center justify-between border-t border-gray-100 dark:border-slate-800/50 pt-2 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1 text-[10px] text-green-600 dark:text-green-500 font-mono">
                      <CheckCircle2 size={10} /> Mined
                    </div>
                    <a 
                      href={`https://sepolia.etherscan.io/address/${entry.user}`} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-1 text-[10px] text-blue-500 hover:text-blue-400 transition hover:underline"
                    >
                      View on Etherscan <ExternalLink size={10} />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {(!entries || entries.length === 0) && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="p-4 bg-gray-100 dark:bg-slate-800 rounded-full mb-4">
              <Box className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 dark:text-gray-400 font-medium">Genesis Block Empty</p>
            <p className="text-xs text-gray-400 mt-1">Be the first to sign the ledger.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlockchainFeed;