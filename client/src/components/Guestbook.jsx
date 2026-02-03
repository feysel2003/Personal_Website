import { useState, useEffect } from 'react';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { parseEther } from 'viem'; 
import { motion } from 'framer-motion';
import { Loader2, PenTool, Hash, Wallet, Sparkles, Coffee } from 'lucide-react';
import confetti from 'canvas-confetti';
import guestbookAbi from '../utils/guestbookAbi.json';
import { CONTRACT_ADDRESS } from '../utils/constants';

// IMPORT THE NEW FEED COMPONENT
import BlockchainFeed from './BlockchainFeed';

const Guestbook = () => {
  const [message, setMessage] = useState('');
  const [sendTip, setSendTip] = useState(false); 
  const { isConnected } = useAccount();
  
  // Web3 Hooks
  const { data: hash, writeContract, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash }); 
  const { data: entries, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: guestbookAbi.abi,
    functionName: 'getEntries',
  });

  // Success Effect (Confetti)
  useEffect(() => {
    if (isConfirmed) {
      refetch();
      setMessage('');
      setSendTip(false);
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
      value: sendTip ? parseEther('0.002') : parseEther('0') 
    });
  };

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden">
      
      {/* Background Decor (Grid) */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

      <div className="relative z-10 grid lg:grid-cols-12 gap-12 items-start">
        
        {/* LEFT: INPUT STATION */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-gray-200 dark:border-slate-700 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 dark:bg-blue-600/20 blur-[80px] -z-10" />

            <h2 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Immutable Ledger</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 text-sm">
              Sign the smart contract on Sepolia Testnet.
            </p>

            {!isConnected ? (
              <div className="p-8 border-2 border-dashed border-gray-300 dark:border-slate-700 rounded-xl text-center bg-gray-50 dark:bg-slate-950/50">
                <Wallet className="w-12 h-12 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
                <h3 className="text-gray-900 dark:text-white font-bold mb-2">Wallet Not Connected</h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs mb-4">
                  Please connect MetaMask to interact with the blockchain.
                </p>
                <div className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-[10px] uppercase font-bold tracking-wider rounded-full">
                  Sepolia Network
                </div>
              </div>
            ) : (
              <form onSubmit={handleSign} className="space-y-4">
                <div className="relative">
                  <textarea 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Write your message..."
                    rows="3"
                    maxLength="140"
                    className="w-full bg-gray-50 dark:bg-slate-950 border border-gray-200 dark:border-slate-700 rounded-xl p-4 text-gray-900 dark:text-white focus:outline-none focus:border-blue-500 transition resize-none"
                  />
                  <div className="absolute bottom-3 right-3 text-[10px] text-gray-400 font-mono">{message.length}/140</div>
                </div>

                {/* Tipping Toggle */}
                <div 
                  onClick={() => setSendTip(!sendTip)}
                  className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                    sendTip 
                      ? 'bg-amber-50 dark:bg-amber-900/20 border-amber-400 dark:border-amber-600' 
                      : 'bg-gray-50 dark:bg-slate-950 border-gray-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${sendTip ? 'bg-amber-400 text-white' : 'bg-gray-200 dark:bg-slate-800 text-gray-400'}`}>
                      <Coffee size={18} />
                    </div>
                    <div>
                      <p className={`font-bold text-sm ${sendTip ? 'text-amber-700 dark:text-amber-400' : 'text-gray-600 dark:text-gray-400'}`}>Buy me a coffee</p>
                      <p className="text-[10px] text-gray-500">Send 0.002 ETH</p>
                    </div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${sendTip ? 'border-amber-500 bg-amber-500' : 'border-gray-300 dark:border-slate-600'}`}>
                    {sendTip && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>

                <button 
                  disabled={isPending || isConfirming || !message}
                  className={`w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg text-white text-sm
                    ${isPending || isConfirming 
                      ? 'bg-gray-400 dark:bg-slate-700 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-blue-500/25'}
                  `}
                >
                  {isPending || isConfirming ? (
                    <><Loader2 className="animate-spin" size={18} /> Mining...</>
                  ) : (
                    <><PenTool size={18} /> {sendTip ? 'Sign & Donate' : 'Sign Guestbook'}</>
                  )}
                </button>

                {isConfirmed && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-100 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 text-green-700 dark:text-green-400 text-xs font-bold rounded-lg flex items-center justify-center gap-2"
                  >
                    <Sparkles size={14} /> Block Mined Successfully!
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

        {/* RIGHT: THE LIVE FEED (Using the Component) */}
        <div className="lg:col-span-7">
          <BlockchainFeed entries={entries} />
        </div>

      </div>
    </section>
  );
};

export default Guestbook;