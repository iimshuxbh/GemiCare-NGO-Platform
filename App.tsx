
import React, { useState, useEffect } from 'react';
import { AppTab, User } from './types';
import Dashboard from './components/Dashboard';
import VolunteerMatch from './components/VolunteerMatch';
import GrantReview from './components/GrantReview';
import ResourceCenter from './components/ResourceCenter';
import ImpactModeling from './components/ImpactModeling';
import AgentWorkshop from './components/AgentWorkshop';
import NexusIntelligence from './components/NexusIntelligence';
import Sidebar from './components/Sidebar';
import Auth from './components/Auth';
import { Sparkles, Menu, X, ShieldCheck, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.Dashboard);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!currentUser) {
    return <Auth onLogin={setCurrentUser} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-50 flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 fill-current" />
          </div>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">Lumina</span>
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          {isSidebarOpen ? <X /> : <Menu />}
        </button>
      </div>

      <Sidebar 
        isOpen={isSidebarOpen} 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (window.innerWidth < 1024) setIsSidebarOpen(false);
        }} 
      />

      <main className={`flex-1 transition-all duration-500 ease-in-out ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} pt-16 lg:pt-0 h-screen overflow-y-auto`}>
        <div className="max-w-7xl mx-auto p-6 md:p-10">
          <motion.header 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6"
          >
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <div className="h-1 w-8 rounded-full gradient-bg" />
                <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">Secure Environment</span>
              </div>
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                {activeTab === AppTab.Dashboard && "Mission Control"}
                {activeTab === AppTab.VolunteerMatch && "Synergy Matching"}
                {activeTab === AppTab.GrantReview && "Grant Catalyst"}
                {activeTab === AppTab.ResourceCenter && "Nexus Core"}
                {activeTab === AppTab.ImpactModeling && "Impact Forecasting"}
                {activeTab === AppTab.AgentWorkshop && "Agent Workshop"}
                {activeTab === AppTab.NexusIntelligence && "Nexus Intelligence"}
              </h1>
              <p className="text-slate-500 mt-2 text-lg">
                Strategic AI intelligence for {currentUser.org}.
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <motion.div 
                whileHover={{ scale: 1.02 }}
                className="hidden md:flex items-center space-x-3 bg-white border border-slate-200 rounded-2xl px-5 py-3 text-sm text-slate-700 font-semibold shadow-sm glass"
              >
                <ShieldCheck className="w-5 h-5 text-indigo-500" />
                <span>Encrypted Connection</span>
              </motion.div>
              <button 
                onClick={() => setCurrentUser(null)}
                className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-rose-500 transition-colors shadow-sm"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </motion.header>

          <AnimatePresence mode="wait">
            <motion.section
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {activeTab === AppTab.Dashboard && <Dashboard />}
              {activeTab === AppTab.VolunteerMatch && <VolunteerMatch />}
              {activeTab === AppTab.GrantReview && <GrantReview />}
              {activeTab === AppTab.ResourceCenter && <ResourceCenter />}
              {activeTab === AppTab.ImpactModeling && <ImpactModeling />}
              {activeTab === AppTab.AgentWorkshop && <AgentWorkshop />}
              {activeTab === AppTab.NexusIntelligence && <NexusIntelligence />}
            </motion.section>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default App;
