
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart3, TrendingUp, AlertTriangle, CheckCircle2, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';

const ImpactModeling: React.FC = () => {
  const [description, setDescription] = useState('');
  const [prediction, setPrediction] = useState('');
  const [branding, setBranding] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleForecast = async () => {
    if (!description) return;
    setLoading(true);
    try {
      const [pred, brand] = await Promise.all([
        geminiService.predictImpact(description),
        geminiService.generateProjectBranding("Project Lumina", description)
      ]);
      setPrediction(pred || '');
      setBranding(brand);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
            <BarChart3 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">Predictive Modeler</h3>
            <p className="text-sm text-slate-400 font-medium">Forecast social ROI and generate project identity.</p>
          </div>
        </div>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your project goal, location, and target population..."
          className="w-full h-40 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all text-slate-700 leading-relaxed outline-none font-medium"
        />
        <button 
          onClick={handleForecast}
          disabled={loading || !description}
          className="w-full mt-6 bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center space-x-3 transition-all"
        >
          {loading ? <Loader2 className="animate-spin" /> : <TrendingUp className="w-5 h-5" />}
          <span>Run Impact Simulation</span>
        </button>
      </div>

      <AnimatePresence>
        {prediction && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="lg:col-span-2 bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-8">
                <Sparkles className="w-12 h-12 text-amber-200" />
              </div>
              <h4 className="text-2xl font-black text-slate-900 mb-8 flex items-center">
                <CheckCircle2 className="w-6 h-6 mr-3 text-emerald-500" />
                Forecast Analysis
              </h4>
              <div className="prose prose-amber max-w-none text-slate-700 font-medium leading-relaxed whitespace-pre-wrap">
                {prediction}
              </div>
            </div>

            <div className="lg:col-span-1 space-y-8">
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                <h4 className="text-lg font-black mb-6 flex items-center">
                  <ImageIcon className="w-5 h-5 mr-2 text-indigo-400" />
                  AI Identity Generation
                </h4>
                {branding ? (
                  <motion.img 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    src={branding} 
                    className="w-full aspect-square rounded-[2rem] object-cover shadow-2xl border-4 border-white/10" 
                  />
                ) : (
                  <div className="w-full aspect-square bg-white/5 rounded-[2rem] flex items-center justify-center border-2 border-dashed border-white/20">
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Generating Brand...</p>
                  </div>
                )}
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-6 text-center">
                  Synthesized for your mission
                </p>
              </div>

              <div className="bg-rose-50 p-8 rounded-[2.5rem] border border-rose-100">
                <h4 className="text-rose-900 font-black mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2" />
                  Risk Mitigation
                </h4>
                <p className="text-sm text-rose-700 font-bold leading-relaxed">
                  Lumina's risk sub-routine suggests adding 15% buffer to initial timelines due to regional logistic volatility.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ImpactModeling;
