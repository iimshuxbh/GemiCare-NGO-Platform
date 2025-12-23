
import React, { useState, useRef } from 'react';
import { geminiService } from '../services/geminiService';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare, Camera, BrainCircuit, Send, 
  Loader2, Sparkles, Image as ImageIcon, Zap, 
  ChevronRight, Brain, Upload, X
} from 'lucide-react';

const NexusIntelligence: React.FC = () => {
  const [activeSubTab, setActiveSubTab] = useState<'chat' | 'vision' | 'reasoning'>('chat');
  
  // Chat State
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([]);
  const [isChatting, setIsChatting] = useState(false);

  // Vision State
  const [visionPrompt, setVisionPrompt] = useState('Analyze this image and explain how it relates to NGO impact or community needs.');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [visionResult, setVisionResult] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Reasoning State
  const [reasonInput, setReasonInput] = useState('');
  const [reasonResult, setReasonResult] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  // Fast Input State
  const [fastInput, setFastInput] = useState('');
  const [fastResult, setFastResult] = useState('');
  const [isFastLoading, setIsFastLoading] = useState(false);

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsChatting(true);

    try {
      const stream = await geminiService.chatStream(userMsg, messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      })));
      
      let fullText = '';
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of stream) {
        fullText += chunk.text;
        setMessages(prev => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = fullText;
          return newMessages;
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsChatting(false);
    }
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleVision = async () => {
    if (!selectedImage || !imageFile) return;
    setIsAnalyzing(true);
    try {
      const base64 = selectedImage.split(',')[1];
      const result = await geminiService.analyzeImage(visionPrompt, base64, imageFile.type);
      setVisionResult(result || '');
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReasoning = async () => {
    if (!reasonInput) return;
    setIsThinking(true);
    try {
      const result = await geminiService.deepReasoning(reasonInput);
      setReasonResult(result || '');
    } catch (e) {
      console.error(e);
    } finally {
      setIsThinking(false);
    }
  };

  const handleFast = async () => {
    if (!fastInput) return;
    setIsFastLoading(true);
    try {
      const result = await geminiService.fastResponse(fastInput);
      setFastResult(result || '');
    } catch (e) {
      console.error(e);
    } finally {
      setIsFastLoading(false);
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Sub-Navigation */}
      <div className="flex bg-white p-2 rounded-3xl shadow-sm border border-slate-100 max-w-2xl mx-auto">
        {[
          { id: 'chat', label: 'AI Chat', icon: MessageSquare },
          { id: 'vision', label: 'Vision Lab', icon: Camera },
          { id: 'reasoning', label: 'Deep Reasoning', icon: BrainCircuit },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 rounded-2xl text-sm font-bold transition-all ${
              activeSubTab === tab.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-50'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      <motion.div
        key={activeSubTab}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {activeSubTab === 'chat' && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with Fast Actions */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                <div className="flex items-center space-x-2 mb-4">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-black uppercase tracking-widest text-slate-400">Fast Analysis</span>
                </div>
                <input 
                  type="text"
                  value={fastInput}
                  onChange={(e) => setFastInput(e.target.value)}
                  placeholder="Summarize..."
                  className="w-full p-3 rounded-xl bg-slate-50 text-xs font-bold border border-slate-100 outline-none focus:ring-2 focus:ring-amber-500/20"
                />
                <button 
                  onClick={handleFast}
                  disabled={isFastLoading}
                  className="w-full mt-3 py-2 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl"
                >
                  {isFastLoading ? <Loader2 className="animate-spin w-3 h-3 mx-auto" /> : 'Quick Flash Response'}
                </button>
                {fastResult && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-amber-50 rounded-xl text-[10px] font-medium text-amber-900 border border-amber-100">
                    {fastResult}
                  </motion.div>
                )}
              </div>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-3 bg-white rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col h-[650px] overflow-hidden">
              <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-slate-900 leading-none">Nexus Intelligence</h4>
                    <p className="text-[10px] text-indigo-500 font-bold uppercase tracking-widest mt-1">Gemini 3 Pro Active</p>
                  </div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-8 bg-slate-50/30">
                {messages.length === 0 && (
                  <div className="h-full flex flex-col items-center justify-center text-center opacity-40">
                    <Brain className="w-16 h-16 mb-4 text-indigo-600" />
                    <p className="text-sm font-bold uppercase tracking-widest">Awaiting Command</p>
                  </div>
                )}
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-5 rounded-[2rem] text-sm font-medium leading-relaxed ${
                      m.role === 'user' 
                        ? 'bg-slate-900 text-white rounded-tr-none shadow-xl' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                    }`}>
                      {m.text || (isChatting && i === messages.length - 1 ? <Loader2 className="animate-spin" /> : '')}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 bg-white border-t border-slate-50 flex space-x-3">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleChat()}
                  placeholder="Ask any complex question..."
                  className="flex-1 px-6 py-4 rounded-2xl bg-slate-50 outline-none font-bold text-slate-800 border border-transparent focus:border-indigo-500 transition-all"
                />
                <button 
                  onClick={handleChat}
                  disabled={isChatting || !chatInput}
                  className="px-6 gradient-bg text-white rounded-2xl font-black uppercase tracking-widest flex items-center justify-center"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}

        {activeSubTab === 'vision' && (
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100">
              <div className="flex flex-col md:flex-row gap-10">
                <div className="flex-1 space-y-6">
                  <h4 className="text-2xl font-black text-slate-900 flex items-center">
                    <Camera className="w-6 h-6 mr-3 text-indigo-600" />
                    Visual Understanding
                  </h4>
                  <p className="text-sm text-slate-500 font-medium">Upload a photo from the field for instant semantic analysis.</p>
                  
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={onImageChange} 
                      className="hidden" 
                      id="image-upload" 
                    />
                    <label 
                      htmlFor="image-upload"
                      className="cursor-pointer block w-full aspect-video rounded-[2rem] border-2 border-dashed border-slate-200 bg-slate-50 hover:bg-slate-100 hover:border-indigo-400 transition-all flex flex-col items-center justify-center text-slate-400 group-hover:text-indigo-600"
                    >
                      {selectedImage ? (
                        <img src={selectedImage} className="w-full h-full object-cover rounded-[2rem]" />
                      ) : (
                        <>
                          <Upload className="w-10 h-10 mb-2" />
                          <span className="text-xs font-black uppercase tracking-widest">Select Visual Data</span>
                        </>
                      )}
                    </label>
                    {selectedImage && (
                      <button 
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-4 right-4 p-2 bg-slate-900/80 text-white rounded-full hover:bg-slate-900"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex-1 space-y-6">
                  <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white">
                    <h5 className="text-xs font-black uppercase tracking-widest text-indigo-400 mb-4">Vision Prompt</h5>
                    <textarea 
                      value={visionPrompt}
                      onChange={(e) => setVisionPrompt(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm font-medium outline-none focus:ring-2 focus:ring-indigo-500 h-32"
                    />
                    <button 
                      onClick={handleVision}
                      disabled={isAnalyzing || !selectedImage}
                      className="w-full mt-6 py-4 gradient-bg rounded-2xl font-black uppercase tracking-widest flex items-center justify-center space-x-2"
                    >
                      {isAnalyzing ? <Loader2 className="animate-spin" /> : <Sparkles className="w-5 h-5" />}
                      <span>Synthesize Findings</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {visionResult && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white p-10 rounded-[3rem] shadow-sm border-l-8 border-indigo-600"
                >
                  <h4 className="text-xl font-black text-slate-900 mb-6 flex items-center">
                    <Brain className="w-5 h-5 mr-3 text-indigo-600" />
                    AI Vision Analysis
                  </h4>
                  <div className="text-slate-700 leading-relaxed font-medium whitespace-pre-wrap">
                    {visionResult}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {activeSubTab === 'reasoning' && (
          <div className="max-w-4xl mx-auto space-y-10">
            <div className="bg-slate-900 p-12 rounded-[3.5rem] text-white shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-10">
                <BrainCircuit className="w-48 h-48" />
              </div>
              <div className="relative z-10">
                <h4 className="text-3xl font-black mb-4 flex items-center">
                  <BrainCircuit className="w-8 h-8 mr-4 text-indigo-400" />
                  Deep Reasoning Engine
                </h4>
                <p className="text-slate-400 font-medium mb-10 max-w-xl">
                  Leveraging a thinking budget of 32,768 tokens for massive strategic deductions and complex problem solving.
                </p>
                <textarea 
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  placeholder="Provide a massive problem statement, multi-variable logic chain, or systemic policy review..."
                  className="w-full h-56 bg-white/5 border border-white/10 rounded-[2.5rem] p-8 text-lg font-medium outline-none focus:bg-white/10 focus:ring-4 focus:ring-indigo-500/20 transition-all"
                />
                <button 
                  onClick={handleReasoning}
                  disabled={isThinking || !reasonInput}
                  className="w-full mt-8 py-5 gradient-bg rounded-[1.8rem] font-black uppercase tracking-widest text-lg flex items-center justify-center space-x-3 shadow-xl"
                >
                  {isThinking ? <Loader2 className="animate-spin w-6 h-6" /> : <Zap className="w-6 h-6" />}
                  <span>{isThinking ? 'Processing Deep Thoughts...' : 'Activate Neural Core'}</span>
                </button>
              </div>
            </div>

            <AnimatePresence>
              {reasonResult && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 rounded-[4rem] shadow-sm border border-slate-100"
                >
                  <div className="flex items-center space-x-4 mb-10">
                    <div className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest">Strategic Report</div>
                    <span className="text-slate-400 font-bold text-sm">Model: Gemini 3 Pro (High Budget)</span>
                  </div>
                  <div className="prose prose-indigo max-w-none">
                    <div className="text-slate-800 text-lg leading-relaxed font-medium whitespace-pre-wrap">
                      {reasonResult}
                    </div>
                  </div>
                  <div className="mt-12 flex space-x-4">
                    <button className="flex-1 py-4 bg-slate-50 text-slate-500 rounded-2xl font-bold hover:bg-slate-100 transition-all">Export Logic Chain</button>
                    <button className="flex-1 py-4 gradient-bg text-white rounded-2xl font-black uppercase tracking-widest">Implement Strategy</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default NexusIntelligence;
