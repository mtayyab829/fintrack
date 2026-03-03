import React from 'react';
import { motion } from 'motion/react';
import { 
  Monitor, 
  Camera, 
  Activity, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  MoreHorizontal, 
  Search,
  Filter,
  Eye,
  Settings,
  ChevronLeft,
  ChevronDown,
  Calendar,
  Download,
  Trash2,
  HelpCircle,
  Sparkles,
  Crown,
  MousePointer2,
  Clock
} from 'lucide-react';
import { View } from '../types';

interface MonitoringProps {
  view?: View;
}

// --- Shared Components ---

const MonitoringHeader = ({ title, actions }: { title: string, actions?: React.ReactNode }) => (
  <div className="flex justify-between items-end mb-6">
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    <div className="flex items-center gap-3">
      <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">See Time Requests</button>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all">
        Add time
      </button>
    </div>
  </div>
);

const SummaryBar = () => (
  <div className="bg-[#151619] border border-white/5 rounded-xl p-4 flex items-center gap-8 mb-6 overflow-x-auto">
    <div className="flex items-center gap-3 pr-8 border-r border-white/5">
      <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500">
        <Clock size={20} />
      </div>
      <div>
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Total</p>
        <p className="text-sm font-bold text-white">0:00</p>
      </div>
    </div>
    {[
      { label: 'Tracked', value: '0:00' },
      { label: 'Manually added', value: '0:00' },
      { label: 'Idle', value: '0:00' },
      { label: 'Paid leave', value: '0:00' },
      { label: 'Paid holiday', value: '0:00' },
      { label: 'Break', value: '0:00' },
    ].map((stat) => (
      <div key={stat.label} className="min-w-fit">
        <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">{stat.label}</p>
        <p className="text-sm font-bold text-white">{stat.value}</p>
      </div>
    ))}
    <div className="ml-auto flex items-center gap-4">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
        <ChevronLeft size={16} className="text-gray-500 cursor-pointer hover:text-white" />
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <Calendar size={14} />
          <span>Mar 02, 2026</span>
        </div>
        <ChevronRight size={16} className="text-gray-500 cursor-pointer hover:text-white" />
      </div>
    </div>
  </div>
);

const MonitoringFilters = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex items-center gap-3 mb-6">
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 min-w-[200px]">
      <div className="w-2 h-2 rounded-full bg-red-500" />
      <span className="text-sm text-gray-300">Muhammad Tayyab</span>
      <ChevronDown size={14} className="ml-auto text-gray-500" />
    </div>
    <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 min-w-[200px]">
      <span className="text-sm text-gray-300">All projects</span>
      <ChevronDown size={14} className="ml-auto text-gray-500" />
    </div>
    <div className="ml-auto flex items-center gap-4">
      <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
        <Settings size={14} /> Settings
      </button>
      <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
        <HelpCircle size={14} /> How to use?
      </button>
    </div>
  </div>
);

const NoDataView = () => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
      <Search size={32} className="text-indigo-500/50" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">No Data</h3>
  </div>
);

const PlusFeaturePlaceholder = ({ title, description, isPremium = false, isAddon = false }: { title: string, description: string, isPremium?: boolean, isAddon?: boolean }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center max-w-2xl mx-auto">
    <div className="flex items-center gap-2 mb-4">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {isPremium && <Crown className="text-amber-500" size={24} />}
      {isAddon && <div className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Add-on</div>}
    </div>
    <p className="text-gray-400 text-sm leading-relaxed mb-8">
      {description}
    </p>
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/20 mb-12">
      Activate {title}
    </button>
    
    <div className="w-full bg-[#151619] border border-white/5 rounded-2xl p-8 shadow-2xl">
      <div className="space-y-4 opacity-40 grayscale">
        <div className="h-64 bg-white/5 rounded-xl border border-white/5 flex items-center justify-center">
          <div className="text-white/20 flex flex-col items-center gap-4">
            <Monitor size={48} />
            <div className="h-4 bg-white/10 rounded w-48" />
            <div className="h-4 bg-white/10 rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Individual Monitoring Views ---

const ScreenshotsView = () => (
  <div className="space-y-6">
    <MonitoringHeader title="Screenshots" />
    <MonitoringFilters />
    <SummaryBar />
    
    <div className="flex items-center justify-between border-b border-white/5 mb-6">
      <div className="flex gap-8">
        <button className="pb-4 text-indigo-400 border-b-2 border-indigo-400 text-sm font-bold">Every 10 Min</button>
        <button className="pb-4 text-gray-500 hover:text-gray-300 text-sm font-bold">All Screenshots</button>
      </div>
      <div className="flex items-center gap-3 pb-4">
        <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-500 flex items-center gap-2 cursor-not-allowed">
          <Download size={14} /> Download
        </button>
        <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-red-500/50 flex items-center gap-2 cursor-not-allowed">
          <Trash2 size={14} /> Delete time entries
        </button>
      </div>
    </div>

    <NoDataView />
  </div>
);

const DailyActivityView = () => (
  <div className="space-y-6">
    <MonitoringHeader title="Daily Activity Monitoring" />
    <div className="flex gap-8 border-b border-white/5 mb-6">
      <button className="pb-4 text-indigo-400 border-b-2 border-indigo-400 text-sm font-bold">Daily Activity Monitoring</button>
      <button className="pb-4 text-gray-500 hover:text-gray-300 text-sm font-bold">Chart</button>
    </div>
    <MonitoringFilters />
    <SummaryBar />
    
    <div className="flex items-center justify-end gap-3 mb-6">
      <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1.5">
        <Sparkles size={14} /> Ask AI
      </button>
      <button className="text-gray-500 hover:text-white text-sm flex items-center gap-1.5">
        <Download size={14} /> Export
      </button>
      <div className="relative">
        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-300 appearance-none">
          <option>Per minute</option>
        </select>
        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
      <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 flex items-center gap-2">
        Columns <ChevronDown size={14} />
      </button>
    </div>

    <NoDataView />
  </div>
);

const Monitoring: React.FC<MonitoringProps> = ({ view = 'monitoring' }) => {
  if (view === 'screenshots') return <ScreenshotsView />;
  if (view === 'daily-activity') return <DailyActivityView />;
  
  if (view === 'unusual-activity') return (
    <PlusFeaturePlaceholder 
      title="Unusual Activity" 
      description="Upgrade to Premium to track unusual activity and performance irregularities. This feature is part of our Premium plans. Upgrade now to unlock it."
      isPremium
    />
  );
  
  if (view === 'smart-monitoring') return (
    <PlusFeaturePlaceholder 
      title="Smart Monitoring" 
      description="Turn on Smart Monitoring to get personalized performance insights powered by AI."
      isAddon
    />
  );

  // Default Monitoring Dashboard (the original view)
  const screenshots = [
    { id: 1, user: 'Sarah Connor', time: '10:45 AM', activity: 85, project: 'FinTrack Mobile', url: 'https://picsum.photos/seed/screen1/400/225' },
    { id: 2, user: 'John Doe', time: '10:42 AM', activity: 92, project: 'Enterprise Dashboard', url: 'https://picsum.photos/seed/screen2/400/225' },
    { id: 3, user: 'Emily Blunt', time: '10:40 AM', activity: 45, project: 'Marketing Assets', url: 'https://picsum.photos/seed/screen3/400/225' },
    { id: 4, user: 'Michael Scott', time: '10:38 AM', activity: 78, project: 'Expense Report', url: 'https://picsum.photos/seed/screen4/400/225' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Monitoring</h1>
          <p className="text-gray-400">Real-time screenshots and activity tracking for your team.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all">
            <Settings size={18} />
            Monitoring Settings
          </button>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
            <Camera size={18} />
            Take Manual Screenshot
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Screenshots', value: '1,248', icon: Camera, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Unusual Activity', value: '3', icon: AlertCircle, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Active Monitors', value: '15', icon: Monitor, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#151619] border border-white/5 p-6 rounded-3xl"
          >
            <div className="flex items-center gap-4">
              <div className={`${stat.bg} p-3 rounded-2xl`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div>
                <p className="text-gray-400 text-sm">{stat.label}</p>
                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-[#151619] border border-white/5 rounded-[2rem] p-8">
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-xl font-bold text-white">Recent Screenshots</h3>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search team member..."
                className="bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>
            <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-gray-400 hover:text-white transition-all">
              <Filter size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {screenshots.map((screen, i) => (
            <motion.div 
              key={screen.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="group relative bg-white/5 rounded-2xl overflow-hidden border border-white/5 hover:border-emerald-500/30 transition-all"
            >
              <img 
                src={screen.url} 
                className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500" 
                alt={`Screenshot by ${screen.user}`}
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                <div className="flex justify-between items-center">
                  <button className="p-2 bg-emerald-500 text-white rounded-xl hover:bg-emerald-600 transition-all">
                    <Eye size={18} />
                  </button>
                  <button className="p-2 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <img 
                    src={`https://picsum.photos/seed/${screen.user}/32/32`} 
                    className="w-8 h-8 rounded-lg object-cover" 
                    alt={screen.user}
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">{screen.user}</p>
                    <p className="text-[10px] text-gray-500">{screen.time}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-[10px] text-gray-400 mb-2">
                  <span>Activity Score</span>
                  <span className={screen.activity > 70 ? 'text-emerald-500' : 'text-amber-500'}>{screen.activity}%</span>
                </div>
                <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                  <div className={`h-full ${screen.activity > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${screen.activity}%` }} />
                </div>
                <p className="mt-3 text-[10px] text-gray-500 truncate">{screen.project}</p>
              </div>
            </motion.div>
          ))}
        </div>
        
        <button className="w-full mt-8 py-4 border border-white/5 rounded-2xl text-gray-500 hover:bg-white/5 hover:text-white transition-all text-sm font-bold">
          Load More Screenshots
        </button>
      </div>
    </div>
  );
};

export default Monitoring;
