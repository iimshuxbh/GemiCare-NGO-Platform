
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Lightbulb, Wrench, Loader2, PlayCircle, Users } from 'lucide-react';

const AgentWorkshop: React.FC = () => {
  const [strategy, setStrategy] = useState('');
  const [debate, setDebate] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDebate = async () => {
    if (!strategy) return;
    setLoading(true);
    try {
      const res = await geminiService.workshopDebate(strategy);
      setDebate(res || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-slate-900 p-10 rounded-[3rem] text-white">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold leading-tight">Agent War Room</h3>
            <p className="text-sm text-slate-400 font-medium">Multidisciplinary AI audit of your strategy.</p>
          </div>
        </div>
        <textarea
          value={strategy}
          onChange={(e) => setStrategy(e.target.value)}
          placeholder="Paste your proposed operational strategy or policy..."
          className="w-full h-48 p-6 rounded-[2rem] bg-white/5 border border-white/10 focus:bg-white/10 focus:border-indigo-500 transition-all text-white font-medium outline-none"
        />
        <button 
          onClick={handleDebate}
          disabled={loading || !strategy}
          className="w-full mt-8 py-5 gradient-bg rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-3 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : <PlayCircle className="w-6 h-6" />}
          <span>Begin Consensus Debate</span>
        </button>
      </div>

      <AnimatePresence>
        {debate && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { title: 'The Skeptic', icon: ShieldAlert, color: 'text-rose-500', bg: 'bg-rose-50' },
              { title: 'The Visionary', icon: Lightbulb, color: 'text-indigo-500', bg: 'bg-indigo-50' },
              { title: 'The Pragmatist', icon: Wrench, color: 'text-emerald-500', bg: 'bg-emerald-50' }
            ].map((agent, i) => (
              <motion.div 
                key={agent.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.2 }}
                className={`p-8 rounded-[2.5rem] ${agent.bg} border-2 border-white`}
              >
                <div className={`p-4 rounded-2xl bg-white shadow-sm inline-flex items-center justify-center mb-6 ${agent.color}`}>
                  <agent.icon className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-4">{agent.title}</h4>
                <div className="text-sm text-slate-700 font-bold leading-relaxed">
                  {debate.split(agent.title)[1]?.split('\n\n')[0] || "Analysis Pending..."}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AgentWorkshop;
