import React from 'react';
import { motion } from 'motion/react';
import { 
  Clock, 
  Monitor, 
  Users, 
  Activity, 
  CheckCircle2, 
  AlertCircle,
  ChevronRight,
  MoreHorizontal,
  Search
} from 'lucide-react';

const activeUsers = [
  { id: 1, user: 'Sarah Connor', project: 'FinTrack Mobile', task: 'Design System Update', duration: '04:22:15', status: 'Active', efficiency: '94%' },
  { id: 2, user: 'John Doe', project: 'Enterprise Dashboard', task: 'API Infrastructure', duration: '02:15:30', status: 'Active', efficiency: '88%' },
  { id: 3, user: 'Emily Blunt', project: 'Marketing Assets', task: 'User Interview Analysis', duration: '01:45:00', status: 'Idle', efficiency: '72%' },
  { id: 4, user: 'Michael Scott', project: 'Expense Report', task: 'Reviewing Submissions', duration: '00:30:15', status: 'Active', efficiency: '91%' },
];

const RealTime = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Real Time Monitoring</h1>
          <p className="text-gray-400">Monitor active team sessions and real-time project progress.</p>
        </div>
        <div className="flex gap-3">
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Search active users..."
              className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
            <Activity size={18} />
            Live Feed
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: 'Active Users', value: '12', icon: Users, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Total Hours Today', value: '84.5h', icon: Clock, color: 'text-blue-500', bg: 'bg-blue-500/10' },
          { label: 'Avg. Efficiency', value: '91.2%', icon: Activity, color: 'text-purple-500', bg: 'bg-purple-500/10' },
          { label: 'Active Projects', value: '8', icon: Monitor, color: 'text-amber-500', bg: 'bg-amber-500/10' },
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

      <div className="bg-[#151619] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Active Sessions</h3>
          <div className="flex gap-2">
            <span className="flex items-center gap-2 text-xs font-bold text-emerald-500">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Updates
            </span>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b border-white/5">
                <th className="p-6 font-medium">User</th>
                <th className="p-6 font-medium">Project</th>
                <th className="p-6 font-medium">Task</th>
                <th className="p-6 font-medium">Duration</th>
                <th className="p-6 font-medium">Efficiency</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {activeUsers.map((session) => (
                <tr key={session.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://picsum.photos/seed/${session.user}/40/40`} 
                        className="w-10 h-10 rounded-xl object-cover" 
                        alt={session.user}
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-white font-medium">{session.user}</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-400">{session.project}</td>
                  <td className="p-6 text-gray-400 truncate max-w-[200px]">{session.task}</td>
                  <td className="p-6 text-white font-mono">{session.duration}</td>
                  <td className="p-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-white/5 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full" style={{ width: session.efficiency }} />
                      </div>
                      <span className="text-white font-medium">{session.efficiency}</span>
                    </div>
                  </td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                      session.status === 'Active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {session.status}
                    </span>
                  </td>
                  <td className="p-6 text-right">
                    <div className="flex justify-end gap-2">
                      <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
                        <ChevronRight size={18} />
                      </button>
                      <button className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white transition-all">
                        <MoreHorizontal size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RealTime;
