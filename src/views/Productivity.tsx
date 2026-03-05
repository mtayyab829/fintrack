import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Zap, 
  Clock, 
  Activity, 
  CheckCircle2, 
  AlertCircle, 
  ChevronRight, 
  MoreHorizontal, 
  Search,
  Filter,
  BarChart3,
  PieChart,
  ChevronDown,
  Calendar,
  HelpCircle,
  LayoutGrid,
  List,
  Crown,
  MousePointer2,
  Settings,
  User,
  Users,
  Briefcase,
  Layers,
  Type,
  Timer,
  UserCheck,
  Globe,
  Monitor,
  Edit2,
  Columns,
  X
} from 'lucide-react';
import { View } from '../types';

interface ProductivityProps {
  view?: View;
  selectedMember?: { id: string, name: string, avatar?: string } | null;
  onMemberSelect?: (member: { id: string, name: string, avatar?: string } | null) => void;
}

// --- Shared Components ---

const ProductivityHeader = ({ title, actions }: { title: string, actions?: React.ReactNode }) => (
  <div className="flex justify-between items-end mb-6">
    <h1 className="text-2xl font-bold text-white">{title}</h1>
    <div className="flex items-center gap-3">
      <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
        <HelpCircle size={14} /> How to use?
      </button>
    </div>
  </div>
);

const NoDataWidget = ({ title, icon: Icon, description }: { title: string, icon: any, description: string }) => (
  <div className="bg-[#151619] border border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center text-center min-h-[300px]">
    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl flex items-center justify-center text-indigo-500 mb-4">
      <Icon size={24} />
    </div>
    <p className="text-gray-500 text-sm">{description}</p>
  </div>
);

const PlusFeaturePlaceholder = ({ title, description, isPremium = false }: { title: string, description: string, isPremium?: boolean }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center max-w-2xl mx-auto">
    <div className="flex items-center gap-2 mb-4">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      {isPremium && <Crown className="text-amber-500" size={24} />}
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
            <Activity size={48} />
            <div className="h-4 bg-white/10 rounded w-48" />
            <div className="h-4 bg-white/10 rounded w-32" />
          </div>
        </div>
      </div>
    </div>
  </div>
);

// --- Individual Productivity Views ---

const ProductivityInsightsView = ({ selectedMember, onMemberSelect }: { selectedMember?: any, onMemberSelect?: (m: any) => void }) => (
  <div className="space-y-6">
    <ProductivityHeader title="Productivity" />
    <div className="flex gap-8 border-b border-white/5 mb-6">
      <button className="pb-4 text-indigo-400 border-b-2 border-indigo-400 text-sm font-bold">Per Member</button>
      <button className="pb-4 text-gray-500 hover:text-gray-300 text-sm font-bold">Per Team</button>
      <button className="pb-4 text-gray-500 hover:text-gray-300 text-sm font-bold">Workspace</button>
      <button className="pb-4 text-gray-500 hover:text-gray-300 text-sm font-bold">Data Table</button>
    </div>

    <div className="flex items-center gap-3 mb-8">
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 min-w-[180px] cursor-pointer hover:bg-white/10 transition-all group relative">
        <User size={14} className="text-gray-500" />
        <span className="text-sm text-gray-300">{selectedMember?.name || 'Select Member'}</span>
        <ChevronDown size={14} className="ml-auto text-gray-500" />
        
        {selectedMember && (
          <button 
            onClick={(e) => { e.stopPropagation(); onMemberSelect?.(null); }}
            className="absolute -right-2 -top-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all"
          >
            <X size={12} />
          </button>
        )}
      </div>
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 min-w-[220px]">
        <Calendar size={14} className="text-gray-500" />
        <span className="text-sm text-gray-300">Mar 02, 2026 – Mar 08, 202</span>
        <ChevronDown size={14} className="ml-auto text-gray-500" />
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-1 space-y-2">
        <h3 className="text-sm font-bold text-gray-400 mb-2">Time</h3>
        {selectedMember ? (
          <div className="bg-[#151619] border border-white/5 rounded-2xl p-6 min-h-[300px] flex flex-col justify-center">
            <div className="text-center">
              <p className="text-gray-500 text-xs uppercase font-bold mb-2">Total Tracked</p>
              <h2 className="text-4xl font-bold text-white">32h 45m</h2>
              <div className="mt-4 flex items-center justify-center gap-2 text-emerald-500 text-sm">
                <TrendingUp size={16} /> +12% vs last week
              </div>
            </div>
          </div>
        ) : (
          <NoDataWidget title="Time" icon={Clock} description="No data about time yet." />
        )}
      </div>
      <div className="lg:col-span-1 space-y-2">
        <h3 className="text-sm font-bold text-gray-400 mb-2">Tasks</h3>
        {selectedMember ? (
          <div className="bg-[#151619] border border-white/5 rounded-2xl p-6 min-h-[300px]">
            <div className="space-y-4">
              {[
                { name: 'Financial Audit', status: 'Done', color: 'emerald' },
                { name: 'Quarterly Review', status: 'In Progress', color: 'blue' },
                { name: 'Tax Filing', status: 'To Do', color: 'gray' }
              ].map((t, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                  <span className="text-sm text-white">{t.name}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-${t.color}-500/10 text-${t.color}-500`}>{t.status}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <NoDataWidget title="Tasks" icon={List} description="No tasks for this member yet." />
        )}
      </div>
      <div className="lg:col-span-1 space-y-2">
        <h3 className="text-sm font-bold text-gray-400 mb-2">Attendance</h3>
        <div className="bg-[#151619] border border-white/5 rounded-2xl p-6 min-h-[300px]">
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center">
              <span className="text-[10px] font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded uppercase">Absent</span>
              <p className="text-2xl font-bold text-white mt-2">0</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded uppercase">On Leave</span>
              <p className="text-2xl font-bold text-white mt-2">0</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-indigo-400 bg-indigo-400/10 px-2 py-0.5 rounded uppercase">Tracked Less</span>
              <p className="text-2xl font-bold text-white mt-2">0</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <span className="text-[10px] font-bold text-orange-400 bg-orange-400/10 px-2 py-0.5 rounded uppercase">Late</span>
              <p className="text-2xl font-bold text-white mt-2">0</p>
            </div>
            <div className="text-center">
              <span className="text-[10px] font-bold text-rose-400 bg-rose-400/10 px-2 py-0.5 rounded uppercase">Left Early</span>
              <p className="text-2xl font-bold text-white mt-2">0</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-2">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold text-gray-400">Productivity</h3>
          <div className="flex items-center gap-1 text-[10px] text-gray-500">
            Percent of work time <ChevronDown size={10} />
          </div>
        </div>
        {selectedMember ? (
          <div className="bg-[#151619] border border-white/5 rounded-2xl p-6 min-h-[300px] flex flex-col items-center justify-center">
            <div className="relative w-48 h-48">
              <svg className="w-full h-full" viewBox="0 0 36 36">
                <path className="text-white/5" strokeDasharray="100, 100" strokeWidth="3" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path className="text-indigo-500" strokeDasharray="85, 100" strokeWidth="3" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold text-white">85%</span>
                <span className="text-[10px] text-gray-500 uppercase font-bold">Productive</span>
              </div>
            </div>
          </div>
        ) : (
          <NoDataWidget title="Productivity" icon={TrendingUp} description="No data about productivity yet." />
        )}
      </div>
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-gray-400 mb-2">Productive Time</h3>
        {selectedMember ? (
          <div className="bg-[#151619] border border-white/5 rounded-2xl p-6 min-h-[300px] flex flex-col justify-center">
             <div className="space-y-6">
               {[
                 { label: 'Productive', time: '28h 15m', color: 'emerald', percent: 85 },
                 { label: 'Neutral', time: '3h 10m', color: 'gray', percent: 10 },
                 { label: 'Non-productive', time: '1h 20m', color: 'red', percent: 5 }
               ].map((p, i) => (
                 <div key={i} className="space-y-2">
                   <div className="flex justify-between text-xs">
                     <span className="text-gray-400">{p.label}</span>
                     <span className="text-white font-bold">{p.time}</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                     <div className={`h-full bg-${p.color}-500`} style={{ width: `${p.percent}%` }} />
                   </div>
                 </div>
               ))}
             </div>
          </div>
        ) : (
          <NoDataWidget title="Productive Time" icon={Activity} description="No data about productivity yet." />
        )}
      </div>
    </div>
  </div>
);

const AppsWebsitesView = () => (
  <div className="space-y-6">
    <div className="flex items-center gap-2 mb-6">
      <h1 className="text-2xl font-bold text-white">Apps & Websites</h1>
      <HelpCircle size={18} className="text-gray-500 cursor-help" />
    </div>

    <div className="flex items-center justify-between border-b border-white/5 mb-6">
      <div className="flex gap-8">
        <button className="pb-4 text-indigo-400 border-b-2 border-indigo-400 text-sm font-bold">Workspace</button>
        <button className="pb-4 text-gray-500 hover:text-gray-300 text-sm font-bold">Per Team</button>
        <button className="pb-4 text-gray-500 hover:text-gray-300 text-sm font-bold">Per Title</button>
      </div>
      <div className="flex items-center gap-4 pb-4">
        <button className="text-indigo-400 hover:text-indigo-300 text-sm font-medium">Go to report</button>
        <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
          <HelpCircle size={14} /> How to use?
        </button>
      </div>
    </div>

    <div className="flex items-center gap-3 mb-6">
      <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
        <button className="p-1.5 bg-white/10 rounded text-gray-300"><LayoutGrid size={16} /></button>
        <button className="p-1.5 text-gray-500 hover:text-gray-300"><List size={16} /></button>
      </div>
      <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300">
        <LayoutGrid size={14} className="text-gray-500" /> Category
      </button>
      <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300">
        <TrendingUp size={14} className="text-gray-500" /> Productive
      </button>
      <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300">
        <Monitor size={14} className="text-gray-500" /> Type
      </button>
      <div className="ml-auto flex items-center gap-3">
        <button className="bg-white/5 border border-white/10 rounded-lg px-4 py-1.5 text-sm text-gray-300 hover:bg-white/10 transition-all">
          Bulk Edit
        </button>
        <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 flex items-center gap-2">
          Columns <ChevronDown size={14} />
        </button>
      </div>
    </div>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400 border-b border-white/5 bg-white/[0.02]">
            <th className="p-4 font-bold">App / Website <ChevronDown size={14} className="inline ml-1" /></th>
            <th className="p-4 font-bold">Categories <ChevronDown size={14} className="inline ml-1" /></th>
            <th className="p-4 font-bold">Type <ChevronDown size={14} className="inline ml-1" /></th>
            <th className="p-4 font-bold text-center">Unset</th>
            <th className="p-4 font-bold text-center">Non-productive</th>
            <th className="p-4 font-bold text-center">Neutral</th>
            <th className="p-4 font-bold text-center">Productive</th>
            <th className="p-4 font-bold">Hours (last 15 days) <ChevronDown size={14} className="inline ml-1" /></th>
            <th className="p-4 font-bold">Usage Percentage <ChevronDown size={14} className="inline ml-1" /></th>
          </tr>
        </thead>
        <tbody>
          {[
            { name: 'Manually Added Time', category: 'Added Time', type: '', hours: '1:00', percent: '100%', status: 'productive' },
            { name: 'Zoho Books', category: 'Accounting', type: 'app', hours: '0:00', percent: '0%', status: 'productive' },
            { name: 'Airtable', category: 'Analytics', type: 'app', hours: '0:00', percent: '0%', status: 'productive' },
            { name: 'Adobe Premiere Pro', category: 'Video Editing', type: 'app', hours: '0:00', percent: '0%', status: 'productive' },
            { name: 'IONOS', category: 'Development', type: 'website', hours: '0:00', percent: '0%', status: 'productive' },
            { name: 'Adobe After Effects', category: 'Design', type: 'app', hours: '0:00', percent: '0%', status: 'productive' },
          ].map((item, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-white/10 rounded flex items-center justify-center text-[10px] font-bold text-gray-400">
                    {item.name.charAt(0)}
                  </div>
                  <span className="text-white font-medium">{item.name}</span>
                </div>
              </td>
              <td className="p-4 text-gray-400">{item.category}</td>
              <td className="p-4 text-gray-400">{item.type}</td>
              <td className="p-4 text-center"><div className="w-4 h-4 rounded-full border-2 border-white/10 mx-auto" /></td>
              <td className="p-4 text-center"><div className="w-4 h-4 rounded-full border-2 border-white/10 mx-auto" /></td>
              <td className="p-4 text-center"><div className="w-4 h-4 rounded-full border-2 border-white/10 mx-auto" /></td>
              <td className="p-4 text-center"><div className="w-4 h-4 rounded-full border-2 border-indigo-500 bg-indigo-500/20 mx-auto flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-indigo-500" /></div></td>
              <td className="p-4 text-gray-400 font-mono">{item.hours}</td>
              <td className="p-4 text-gray-400 font-mono">{item.percent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const WorkLifeBalanceView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-end mb-6">
      <h1 className="text-2xl font-bold text-white">Work-Life Balance</h1>
      <div className="flex items-center gap-4">
        <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
          <Settings size={14} /> Settings
        </button>
        <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
          <HelpCircle size={14} /> How to use?
        </button>
      </div>
    </div>

    <div className="flex items-center gap-3 mb-8">
      <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300">
        <Users size={14} className="text-gray-500" /> Members
      </button>
      <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300">
        <Layers size={14} className="text-gray-500" /> Teams
      </button>
      <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300">
        <Type size={14} className="text-gray-500" /> Titles
      </button>
      <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 min-w-[220px]">
        <Calendar size={14} className="text-gray-500" />
        <span className="text-sm text-gray-300">Mar 02, 2026 – Mar 08, 202</span>
        <ChevronDown size={14} className="ml-auto text-gray-500" />
      </div>
    </div>

    <div className="flex flex-col items-center justify-center py-32 text-center">
      <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
        <Search size={32} className="text-indigo-500/50" />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">No Data</h3>
    </div>
  </div>
);

const Productivity: React.FC<ProductivityProps> = ({ view = 'productivity', selectedMember, onMemberSelect }) => {
  if (view === 'productivity-insights') return <ProductivityInsightsView selectedMember={selectedMember} onMemberSelect={onMemberSelect} />;
  if (view === 'apps-websites-prod') return <AppsWebsitesView />;
  if (view === 'work-life-balance') return <WorkLifeBalanceView />;
  
  if (view === 'burnout-risk') return (
    <PlusFeaturePlaceholder 
      title="Burnout Risk" 
      description="Ensure your workspace members don't burn out by monitoring their work patterns. The Burnout Risk report shows you who's been working too much, who needs rest, and other risks so you can prevent burnout before it's too late. This feature is included in our Plus plan and above."
      isPremium
    />
  );

  // Default Productivity Dashboard (the original view)
  const productivityStats = [
    { id: 1, user: 'Sarah Connor', score: 94, trend: '+4%', status: 'High', color: 'emerald' },
    { id: 2, user: 'John Doe', score: 88, trend: '+2%', status: 'High', color: 'emerald' },
    { id: 3, user: 'Emily Blunt', score: 72, trend: '-5%', status: 'Average', color: 'amber' },
    { id: 4, user: 'Michael Scott', score: 91, trend: '+8%', status: 'High', color: 'emerald' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Productivity</h1>
          <p className="text-gray-400">Analyze team efficiency and productivity trends over time.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all">
            <PieChart size={18} />
            Breakdown
          </button>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
            <TrendingUp size={18} />
            Generate Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Avg. Productivity', value: '88.4%', icon: TrendingUp, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Deep Work Hours', value: '142h', icon: Zap, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Idle Time Total', value: '12.5h', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Tasks Completed', value: '342', icon: CheckCircle2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-[#151619] border border-white/5 rounded-[2rem] p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-bold text-white">Team Productivity Rankings</h3>
            <div className="flex gap-2">
              <button className="text-xs font-bold text-emerald-500 hover:underline">View All Rankings</button>
            </div>
          </div>
          <div className="space-y-6">
            {productivityStats.map((stat, i) => (
              <motion.div 
                key={stat.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 group"
              >
                <div className="flex items-center gap-4 min-w-[200px]">
                  <span className="text-gray-500 font-bold text-sm">#{i + 1}</span>
                  <img 
                    src={`https://picsum.photos/seed/${stat.user}/40/40`} 
                    className="w-10 h-10 rounded-xl object-cover" 
                    alt={stat.user}
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-white font-medium group-hover:text-emerald-500 transition-colors">{stat.user}</span>
                </div>
                <div className="flex-1 flex items-center gap-4">
                  <div className="flex-1 bg-white/5 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.score}%` }}
                      transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                      className={`h-full ${stat.color === 'emerald' ? 'bg-emerald-500' : 'bg-amber-500'}`}
                    />
                  </div>
                  <span className="text-white font-bold w-12">{stat.score}%</span>
                </div>
                <div className="flex items-center gap-2 min-w-[80px] justify-end">
                  <span className={stat.trend.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}>
                    {stat.trend}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="bg-[#151619] border border-white/5 rounded-[2rem] p-8">
          <h3 className="text-xl font-bold text-white mb-6">Productivity Insights</h3>
          <div className="space-y-6">
            {[
              { title: 'Peak Hours', value: '10 AM - 12 PM', description: 'Highest team activity recorded.', icon: Zap, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
              { title: 'Top App', value: 'VS Code', description: 'Used for 42% of total work time.', icon: Activity, color: 'text-blue-500', bg: 'bg-blue-500/10' },
              { title: 'Meetings', value: '12.4h', description: 'Total time spent in calls this week.', icon: BarChart3, color: 'text-purple-500', bg: 'bg-purple-500/10' },
            ].map((insight, i) => (
              <div key={i} className="flex gap-4">
                <div className={`${insight.bg} p-3 rounded-2xl h-fit`}>
                  <insight.icon className={insight.color} size={20} />
                </div>
                <div>
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-white font-bold text-sm">{insight.title}</h4>
                    <span className="text-emerald-500 font-bold text-xs">{insight.value}</span>
                  </div>
                  <p className="text-gray-500 text-xs leading-relaxed">{insight.description}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-bold text-sm hover:bg-white/10 transition-all">
            View Detailed Insights
          </button>
        </div>
      </div>
    </div>
  );
};

export default Productivity;
