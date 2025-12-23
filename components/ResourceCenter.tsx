
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/geminiService';
import { BookOpen, Send, Bot, ArrowRight, Zap, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ResourceCenter: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [response, loading]);

  const handleAsk = async () => {
    if (!query) return;
    const currentQuery = query;
    setLoading(true);
    try {
      const res = await geminiService.getResourceAdvice(currentQuery);
      setResponse(res || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const quickTopics = [
    "Scale strategy for distributed teams",
    "Open-source AI implementation kits",
    "Secure cloud architectures for sensitive data",
    "Optimizing donor retention logic"
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
      <div className="lg:col-span-1 space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
        >
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Expert Modules</h3>
          <div className="space-y-3">
            {quickTopics.map((topic, i) => (
              <motion.button
                key={i}
                whileHover={{ x: 5 }}
                onClick={() => setQuery(topic)}
                className="w-full text-left p-4 text-sm font-bold text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-2xl border border-transparent hover:border-indigo-100 transition-all group flex items-center"
              >
                <span className="flex-1">{topic}</span>
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
              </motion.button>
            ))}
          </div>
          <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white">
            <div className="flex items-center space-x-2 mb-4">
              <Terminal className="w-4 h-4 text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400">System Status</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Nexus nodes at 100% capacity. Ready for high-concurrency requests.
            </p>
          </div>
        </motion.div>
      </div>

      <div className="lg:col-span-3">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-4 md:p-8 rounded-[3rem] shadow-sm border border-slate-100 flex flex-col h-[700px] relative overflow-hidden"
        >
          <div className="flex items-center justify-between mb-8 pb-6 border-b border-slate-50 px-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-2xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-indigo-100">
                <Bot className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-extrabold text-slate-900 leading-none">Nexus Technical Advisor</h4>
                <p className="text-xs text-emerald-500 font-bold uppercase tracking-widest mt-1.5 flex items-center">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse" />
                  Synchronized
                </p>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto mb-8 space-y-10 px-4">
            <AnimatePresence mode="wait">
              {!response && !loading ? (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center py-20"
                >
                  <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mb-6 relative">
                    <motion.div 
                      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 bg-indigo-400 rounded-full blur-2xl"
                    />
                    <Zap className="w-12 h-12 text-indigo-600 relative z-10" />
                  </div>
                  <h4 className="text-2xl font-black text-slate-900 tracking-tight">Intelligence Ready</h4>
                  <p className="text-slate-400 max-w-sm mt-3 font-medium">
                    Bridge the gap between mission and technology. Ask anything.
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-10">
                  <motion.div 
                    initial={{ opacity: 0, x: 20, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    className="flex justify-end"
                  >
                    <div className="bg-slate-900 text-white px-6 py-4 rounded-[2rem] rounded-tr-none max-w-[80%] text-sm font-bold shadow-xl">
                      {query}
                    </div>
                  </motion.div>
                  
                  {loading ? (
                    <div className="flex items-center space-x-3 text-indigo-600 px-2">
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1 }} className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-2 h-2 bg-indigo-600 rounded-full" />
                      <motion.div animate={{ scale: [1, 1.5, 1] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-2 h-2 bg-indigo-600 rounded-full" />
                    </div>
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0, x: -20, scale: 0.95 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      className="flex items-start space-x-5"
                    >
                      <div className="w-10 h-10 rounded-2xl gradient-bg flex items-center justify-center text-white flex-shrink-0 shadow-lg shadow-indigo-100">
                        <Bot className="w-5 h-5" />
                      </div>
                      <div className="bg-slate-50 border border-slate-100 px-7 py-6 rounded-[2.5rem] rounded-tl-none text-slate-800 text-lg leading-relaxed whitespace-pre-wrap font-medium shadow-sm">
                        {response}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>

          <div className="relative mt-auto p-2 bg-slate-50 rounded-[2.5rem] border border-slate-100">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="Query the Nexus..."
              className="w-full pl-6 pr-20 py-5 rounded-[2.2rem] bg-transparent outline-none text-slate-800 font-bold placeholder:text-slate-300"
            />
            <button
              onClick={handleAsk}
              disabled={loading || !query}
              className="absolute right-3 top-3 bottom-3 px-8 gradient-bg text-white rounded-[1.8rem] font-black uppercase tracking-widest text-xs hover:shadow-xl hover:shadow-indigo-200 transition-all disabled:opacity-50"
            >
              Execute
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ResourceCenter;
