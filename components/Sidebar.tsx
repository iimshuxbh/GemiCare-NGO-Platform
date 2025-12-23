
import React from 'react';
import { AppTab } from '../types';
import { 
  LayoutDashboard, Users, FileText, BookOpen, Sparkles, Github, 
  ChevronRight, BarChart3, Users2, Shield, BrainCircuit 
} from 'lucide-react';
import { motion } from 'framer-motion';

interface SidebarProps {
  isOpen: boolean;
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: AppTab.Dashboard, label: 'Control Center', icon: LayoutDashboard },
    { id: AppTab.NexusIntelligence, label: 'Nexus Intelligence', icon: BrainCircuit },
    { id: AppTab.ImpactModeling, label: 'Impact Forecast', icon: BarChart3 },
    { id: AppTab.AgentWorkshop, label: 'Agent Workshop', icon: Users2 },
    { id: AppTab.VolunteerMatch, label: 'Synergy Match', icon: Users },
    { id: AppTab.GrantReview, label: 'Grant Catalyst', icon: FileText },
    { id: AppTab.ResourceCenter, label: 'Nexus Core', icon: BookOpen },
  ];

  return (
    <aside className={`fixed top-0 left-0 h-full bg-white border-r z-40 transition-transform duration-500 w-64 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="p-8 flex items-center space-x-3 mb-4">
        <motion.div 
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.6 }}
          className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center text-white shadow-lg shadow-indigo-200"
        >
          <Sparkles className="w-6 h-6" />
        </motion.div>
        <span className="text-2xl font-extrabold text-slate-900 tracking-tighter">Lumina</span>
      </div>

      <nav className="mt-8 px-4 space-y-1 h-[calc(100%-180px)] overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className="w-full relative group"
          >
            <div
              className={`flex items-center space-x-3 px-5 py-3.5 rounded-2xl text-sm font-bold transition-all duration-300 ${
                activeTab === item.id 
                  ? 'bg-slate-900 text-white shadow-xl shadow-slate-200' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'text-indigo-400' : 'group-hover:text-slate-900'}`} />
              <span>{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="active-pill" className="ml-auto">
                  <ChevronRight className="w-4 h-4 text-indigo-400" />
                </motion.div>
              )}
            </div>
          </button>
        ))}
      </nav>

      <div className="absolute bottom-0 w-full p-6 border-t bg-slate-50/50">
        <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500 mb-2">
          <Shield className="w-3 h-3" />
          <span>Biometric Secure</span>
        </div>
        <a href="#" className="flex items-center justify-center space-x-2 text-slate-400 hover:text-slate-900 text-[10px] font-bold uppercase tracking-widest transition-colors">
          <Github className="w-4 h-4" />
          <span>System v4.2.1-EX</span>
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
