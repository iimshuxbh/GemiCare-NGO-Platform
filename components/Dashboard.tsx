
import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Users, HandHeart, FileCheck, Zap, ArrowUpRight, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const data = [
  { name: 'Jan', volunteers: 12, grants: 2 },
  { name: 'Feb', volunteers: 19, grants: 4 },
  { name: 'Mar', volunteers: 15, grants: 3 },
  { name: 'Apr', volunteers: 22, grants: 5 },
  { name: 'May', volunteers: 30, grants: 7 },
  { name: 'Jun', volunteers: 34, grants: 8 },
];

const StatCard: React.FC<{ title: string; value: string; icon: any; color: string; trend: string; delay: number }> = ({ title, value, icon: Icon, color, trend, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    whileHover={{ y: -5 }}
    className="bg-white p-7 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300 group"
  >
    <div className="flex items-start justify-between">
      <div className={`p-4 rounded-2xl ${color} shadow-lg shadow-current/10 text-white transition-transform group-hover:scale-110`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="flex flex-col items-end">
        <span className="flex items-center text-emerald-600 text-sm font-bold bg-emerald-50 px-2 py-1 rounded-lg">
          {trend}
          <ArrowUpRight className="w-4 h-4 ml-1" />
        </span>
      </div>
    </div>
    <div className="mt-6">
      <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest">{title}</h3>
      <p className="text-3xl font-extrabold text-slate-900 mt-2">{value}</p>
    </div>
  </motion.div>
);

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="Active Force" value="2,543" icon={Users} color="gradient-bg" trend="+14.2%" delay={0.1} />
        <StatCard title="Synergy Ops" value="18" icon={Zap} color="bg-amber-500" trend="+5.4%" delay={0.2} />
        <StatCard title="Capital Flow" value="$1.4M" icon={FileCheck} color="bg-emerald-500" trend="+28.1%" delay={0.3} />
        <StatCard title="Global Rank" value="#4" icon={TrendingUp} color="bg-indigo-900" trend="+2.0%" delay={0.4} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5 }}
          className="lg:col-span-2 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100"
        >
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-extrabold text-slate-900">Force Growth Dynamics</h3>
            <div className="flex space-x-2">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold">LIVE ANALYSIS</span>
            </div>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorImpact" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12, fontWeight: 700}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '20px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)', padding: '12px' }}
                />
                <Area type="monotone" dataKey="volunteers" stroke="#6366f1" fillOpacity={1} fill="url(#colorImpact)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl shadow-indigo-900/20"
        >
          <h3 className="text-xl font-extrabold mb-8 flex items-center">
            <Zap className="w-5 h-5 mr-2 text-indigo-400" />
            Nexus Stream
          </h3>
          <div className="space-y-8">
            {[
              { text: "Lumina matched 5 specialists to Urban Revive", time: "2h ago", color: "bg-indigo-400" },
              { text: "Strategic Grant detected: Gates Global 2025", time: "5h ago", color: "bg-emerald-400" },
              { text: "Impact Analysis: Local retention peaked at 92%", time: "1d ago", color: "bg-amber-400" },
              { text: "System optimization: AI latency reduced by 40ms", time: "2d ago", color: "bg-rose-400" },
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + (i * 0.1) }}
                className="flex items-start space-x-5"
              >
                <div className={`mt-1.5 w-2 h-2 rounded-full ${item.color} shadow-lg shadow-current/50`} />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-200 leading-snug">{item.text}</p>
                  <p className="text-[10px] font-extrabold text-slate-500 uppercase tracking-widest mt-1">{item.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <button className="w-full mt-10 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-all shadow-lg shadow-indigo-900/50">
            Full Audit Logs
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
