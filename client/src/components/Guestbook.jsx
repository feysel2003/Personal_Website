import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem'; // Helper to convert "0.01" to Wei
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, PenTool, Hash, Wallet, ExternalLink, Clock, Coffee, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti'; // <--- Import Confetti
import guestbookAbi from '../utils/guestbookAbi.json';
import { CONTRACT_ADDRESS } from '../utils/constants';

const generateAvatar = (address) => {
  const colors = ['from-pink-500 to-rose-500', 'from-blue-400 to-indigo-500', 'from-green-400 to-emerald-500', 'from-yellow-400 to-orange-500', 'from-purple-500 to-violet-600'];
  const index = parseInt(address.slice(-1), 16) % colors.length;
  return colors[index];
};

const Guestbook = () => {
  const [message, setMessage] = useState('');
  const [sendTip, setSendTip] = useState(false); // <--- State for Tipping
  const { isConnected } = useAccount();
  
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash }); 
  const { data: entries, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: guestbookAbi.abi,
    functionName: 'getEntries',
  });

  // Success Effect
  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setMessage('');
      setSendTip(false);
      // Trigger Confetti!
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#10b981', '#f59e0b']
      });
    }
  }, [isConfirmed, refetch]);

  const handleSign = (e) => {
    e.preventDefault();
    if (!message) return;

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: guestbookAbi.abi,
      functionName: 'signGuestbook',
      args: ["Visitor", message],
      // If tip is checked, send 0.01 ETH, else send 0
      value: sendTip ? parseEther('0.01') : parseEther('0') 
    });
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: Input Station */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-gray-200 dark:border-slate-700 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/20 blur-[80px] -z-10" />

            <h2 className="text-4xl font-bold mb-2 text-gray-900 dark:text-white">Immutable Ledger</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Sign the smart contract. Leave your mark on the blockchain forever.
            </p>

            {!isConnected ? (
              <div className="p-8 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl text-center bg-gray-50 dark:bg-slate-950/50">
                <Wallet className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <h3 className="text-gray-900 dark:text-white font-bold mb-2">Wallet Not Connected</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
                  Recruiters: You need a Web3 Wallet (like MetaMask) to interact with this section. 
                </p>
                <div className="inline-block px-4 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full font-mono">
                  Listening on: Sepolia / Localhost
                </div>
              </div>
            ) : (
              <form onSubmit={handleSign} className="space-y-4">
                <div className="relative">
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    rows="4"
                    maxLength="140"
                    className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition resize-none"
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-gray-500 dark:text-gray-600 font-mono">{message.length}/140</div>
                </div>

                {/* TIPPING TOGGLE */}
                <div 
                  onClick={() => setSendTip(!sendTip)}
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    sendTip 
                      ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-400 dark:border-yellow-600' 
                      : 'bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800 hover:border-gray-300 dark:hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${sendTip ? 'bg-yellow-400 text-white' : 'bg-gray-200 dark:bg-slate-800 text-gray-400'}`}>
                      <Coffee size={20} />
                    </div>
                    <div>
                      <p className={`font-bold ${sendTip ? 'text-yellow-700 dark:text-yellow-400' : 'text-gray-600 dark:text-gray-400'}`}>
                        Buy me a coffee
                      </p>
                      <p className="text-xs text-gray-500">Send 0.01 ETH with message</p>
                    </div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${sendTip ? 'border-yellow-500 bg-yellow-500' : 'border-gray-300 dark:border-slate-600'}`}>
                    {sendTip && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>

                <button 
                  disabled={isPending || isConfirming || !message}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-white
                    ${isPending || isConfirming 
                      ? 'bg-gray-400 dark:bg-slate-700 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:scale-[1.02] hover:shadow-blue-500/25'}
                  `}
                >
                  {isPending || isConfirming ? (
                    <><Loader2 className="animate-spin" /> Processing Transaction...</>
                  ) : (
                    <><PenTool size={20} /> {sendTip ? 'Sign & Donate 0.01 ETH' : 'Sign Guestbook'}</>
                  )}
                </button>

                {isConfirmed && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-sm rounded-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles size={16} /> Block Mined Successfully!
                  </motion.div>
                )}
              </form>
            )}
            
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-800 flex justify-between text-xs text-gray-500 dark:text-gray-500 font-mono">
              <span>Status: Active</span>
              <span>Contract: {CONTRACT_ADDRESS.slice(0,6)}...{CONTRACT_ADDRESS.slice(-4)}</span>
            </div>
          </div>
        </div>

        {/* RIGHT: The Feed */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Blockchain Feed
            </h3>
            <span className="text-xs text-gray-500 dark:text-gray-500 font-mono">Total Blocks: {entries ? entries.length : 0}</span>
          </div>

          <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
            <AnimatePresence mode='popLayout'>
              {entries && [...entries].reverse().map((entry, index) => (
                <motion.div 
                  layout
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.01 }}
                  className={`p-5 rounded-2xl border transition group shadow-sm dark:shadow-none
                    ${entry.hasTipped 
                      ? 'bg-yellow-50 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-700/50' 
                      : 'bg-white dark:bg-slate-900/50 border-gray-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-600'}
                  `}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${generateAvatar(entry.user)} shadow-lg flex-shrink-0`} />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <span className="text-xs font-mono text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-950 px-2 py-1 rounded border border-gray-200 dark:border-slate-800">
                          {entry.user.slice(0, 6)}...{entry.user.slice(-4)}
                        </span>
                        <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                          <Clock size={12} />
                          {new Date(Number(entry.timestamp) * 1000).toLocaleDateString()}
                        </div>
                      </div>
                      
                      <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed break-words">
                        "{entry.message}"
                      </p>

                      {entry.hasTipped && (
                        <div className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30 px-2 py-0.5 rounded-full">
                          <Coffee size={10} /> Supporter (0.01 ETH)
                        </div>
                      )}

                      <div className="mt-3 flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                         <a href={`https://sepolia.etherscan.io/address/${entry.user}`} target="_blank" className="text-xs text-blue-600 dark:text-blue-500 flex items-center gap-1 hover:underline">
                           <ExternalLink size={10} /> View on Etherscan
                         </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {(!entries || entries.length === 0) && (
              <div className="text-center py-20 border border-dashed border-gray-300 dark:border-slate-800 rounded-2xl">
                <p className="text-gray-500 dark:text-gray-600">No blocks mined yet.</p>
                <p className="text-gray-600 dark:text-gray-700 text-sm">Be the genesis author.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Guestbook;