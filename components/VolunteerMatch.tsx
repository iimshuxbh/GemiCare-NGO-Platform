
import React, { useState } from 'react';
import { Project, Volunteer } from '../types';
import { geminiService } from '../services/geminiService';
import { Search, Loader2, MapPin, Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const mockVolunteers: Volunteer[] = [
  { id: '1', name: 'Alice Johnson', skills: ['Web Dev', 'React', 'TypeScript'], bio: 'Senior Engineer with deep focus on accessible infrastructure and digital equality.', location: 'London, UK' },
  { id: '2', name: 'Bob Smith', skills: ['Social Media', 'Marketing'], bio: 'Global reach architect specialized in virality for humanitarian causes.', location: 'NYC, USA' },
  { id: '3', name: 'Charlie Davis', skills: ['Fundraising', 'Strategy'], bio: 'High-net-worth liaison with a track record of $50M+ in secured capital.', location: 'Austin, TX' },
  { id: '4', name: 'Dana Lee', skills: ['Data Analysis', 'Python'], bio: 'Predictive modeling specialist focused on resource optimization.', location: 'Toronto, CA' },
];

const projects: Project[] = [
  { id: 'p1', name: 'Digital Core Redesign', description: 'Architecting the next generation of our global impact platform.', status: 'Planning', requiredSkills: ['React', 'Web Dev', 'UI/UX'] },
  { id: 'p2', name: 'Global Awareness Phase II', description: 'Mass-scale multi-channel initiative for climate action awareness.', status: 'Planning', requiredSkills: ['Marketing', 'Social Media'] },
];

const VolunteerMatch: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project>(projects[0]);
  const [matches, setMatches] = useState<Volunteer[]>(mockVolunteers);
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    setLoading(true);
    try {
      const results = await geminiService.matchVolunteers(selectedProject, mockVolunteers);
      setMatches(results);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
      <div className="lg:col-span-1 space-y-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100"
        >
          <h3 className="text-xl font-extrabold mb-6 text-slate-900">Active Missions</h3>
          <div className="space-y-4">
            {projects.map(p => (
              <button
                key={p.id}
                onClick={() => setSelectedProject(p)}
                className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden group ${
                  selectedProject.id === p.id 
                    ? 'border-indigo-600 bg-indigo-50/30' 
                    : 'border-slate-50 hover:border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="relative z-10">
                  <p className={`font-bold transition-colors ${selectedProject.id === p.id ? 'text-indigo-900' : 'text-slate-900'}`}>{p.name}</p>
                  <p className="text-sm text-slate-500 mt-1 line-clamp-1">{p.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {p.requiredSkills.map(s => (
                      <span key={s} className="text-[10px] bg-white border border-slate-100 px-2 py-1 rounded-lg font-bold text-slate-400 uppercase tracking-tighter">{s}</span>
                    ))}
                  </div>
                </div>
                {selectedProject.id === p.id && (
                  <motion.div layoutId="mission-glow" className="absolute top-0 right-0 w-32 h-32 bg-indigo-400/10 blur-3xl -mr-10 -mt-10" />
                )}
              </button>
            ))}
          </div>
          <button 
            onClick={handleMatch}
            disabled={loading}
            className="w-full mt-8 gradient-bg text-white py-4 rounded-2xl font-extrabold hover:shadow-xl hover:shadow-indigo-200 transition-all disabled:opacity-50 flex items-center justify-center space-x-3 shadow-lg shadow-indigo-100 group"
          >
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : <Sparkles className="w-6 h-6 group-hover:rotate-12 transition-transform" />}
            <span>Execute Synergy Logic</span>
          </button>
        </motion.div>
      </div>

      <div className="lg:col-span-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {matches.map((v, i) => (
              <motion.div 
                key={v.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className={`bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 relative group transition-all ${
                  i === 0 && v.matchScore ? 'ring-2 ring-indigo-500 ring-offset-4 ring-offset-slate-50 shadow-2xl shadow-indigo-500/10' : ''
                }`}
              >
                {v.matchScore !== undefined && (
                  <div className={`absolute top-6 right-6 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
                    v.matchScore > 85 ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {v.matchScore}% SYNERGY
                  </div>
                )}
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 font-extrabold text-xl group-hover:gradient-bg group-hover:text-white transition-all duration-500">
                  {v.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h4 className="font-extrabold text-slate-900 text-xl mt-6">{v.name}</h4>
                <div className="flex items-center text-indigo-600 font-bold text-xs uppercase tracking-widest mt-2">
                  <MapPin className="w-3 h-3 mr-1" />
                  {v.location}
                </div>
                <p className="text-sm text-slate-500 mt-4 leading-relaxed line-clamp-2">{v.bio}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {v.skills.map(skill => (
                    <span key={skill} className="px-3 py-1.5 bg-slate-50 text-slate-600 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                      {skill}
                    </span>
                  ))}
                </div>
                <button className="w-full mt-8 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-sm font-bold transition-all flex items-center justify-center space-x-2">
                  <Send className="w-4 h-4" />
                  <span>Initiate Protocol</span>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default VolunteerMatch;
