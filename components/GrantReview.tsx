
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';
import { FileText, Loader2, Sparkles, Zap, Download, Bookmark } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GrantReview: React.FC = () => {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text) return;
    setLoading(true);
    try {
      const result = await geminiService.analyzeGrant(text);
      setAnalysis(result || '');
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const mockText = `Project: Sustainable Water Architecture 2025
Organization: Global Eco-Initiative
Value: $500,000 USD
Criteria: Must operate in Sub-Saharan Africa. High emphasis on indigenous leadership and solar integration.
Due Date: October 2024. 
Required: ISO Certification, 5-year impact audit, and local government MOU.`;

  return (
    <div className="space-y-10">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
      >
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-extrabold text-slate-900 leading-tight">Document Digest</h3>
            <p className="text-sm text-slate-400 font-medium">Input raw grant parameters for deep analysis.</p>
          </div>
        </div>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste full grant requirements or mission text..."
          className="w-full h-64 p-6 rounded-[2rem] bg-slate-50 border border-slate-100 focus:bg-white focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all text-slate-700 leading-relaxed outline-none"
        />
        <div className="flex flex-col sm:flex-row gap-5 mt-8">
          <button
            onClick={() => setText(mockText)}
            className="flex-1 py-4 px-6 border border-slate-200 rounded-2xl text-sm font-bold text-slate-600 hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            Insert Neural Sample
          </button>
          <button
            onClick={handleAnalyze}
            disabled={loading || !text}
            className="flex-[2] py-4 px-6 bg-slate-900 text-white rounded-2xl font-extrabold hover:bg-slate-800 disabled:opacity-50 flex items-center justify-center space-x-3 shadow-xl transition-all relative overflow-hidden group"
          >
            {loading ? (
              <Loader2 className="animate-spin w-6 h-6" />
            ) : (
              <Sparkles className="w-6 h-6 group-hover:scale-125 transition-transform" />
            )}
            <span>Activate Gemini Catalyst</span>
            {loading && <div className="absolute inset-0 bg-white/10 animate-pulse" />}
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {analysis && (
          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="bg-white p-10 rounded-[3rem] shadow-2xl shadow-indigo-500/5 border-t-8 border-indigo-600 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-8 opacity-5">
              <Zap className="w-48 h-48 text-indigo-900" />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 relative z-10">
              <div className="flex items-center space-x-4">
                <div className="px-4 py-2 bg-indigo-600 text-white rounded-xl text-xs font-black uppercase tracking-widest">
                  Strategic Output
                </div>
                <span className="text-slate-400 font-bold text-sm">Engine: Gemini 3 Pro</span>
              </div>
              <div className="flex space-x-3">
                <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="relative z-10 prose prose-indigo max-w-none">
              <div className="text-slate-700 whitespace-pre-wrap text-lg leading-relaxed font-medium">
                {analysis}
              </div>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-50 flex flex-col md:flex-row gap-4 relative z-10">
              <button className="flex-1 py-4 gradient-bg text-white rounded-2xl font-extrabold shadow-lg shadow-indigo-100 hover:shadow-indigo-200 transition-all">
                Add to Strategy Vault
              </button>
              <button className="flex-1 py-4 border border-slate-100 text-slate-500 rounded-2xl font-bold hover:bg-slate-50 transition-all">
                Request Deep Iteration
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GrantReview;
