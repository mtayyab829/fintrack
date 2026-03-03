import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users as UsersIcon, 
  DollarSign, 
  Clock, 
  ChevronRight, 
  ArrowUpRight, 
  ArrowDownRight,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Plus
} from 'lucide-react';

const data = [
  { name: 'Mon', hours: 45, revenue: 2400 },
  { name: 'Tue', hours: 52, revenue: 1398 },
  { name: 'Wed', hours: 48, revenue: 9800 },
  { name: 'Thu', hours: 61, revenue: 3908 },
  { name: 'Fri', hours: 55, revenue: 4800 },
  { name: 'Sat', hours: 20, revenue: 3800 },
  { name: 'Sun', hours: 15, revenue: 4300 },
];

const recentActivity = [
  { id: 1, user: 'Sarah Connor', action: 'completed task', target: 'Design System Update', time: '2m ago', type: 'success' },
  { id: 2, user: 'John Doe', action: 'started tracking', target: 'API Infrastructure', time: '15m ago', type: 'info' },
  { id: 3, user: 'Emily Blunt', action: 'uploaded file', target: 'Marketing Assets', time: '1h ago', type: 'info' },
  { id: 4, user: 'Michael Scott', action: 'requested approval', target: 'Expense Report', time: '3h ago', type: 'warning' },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Enterprise Overview</h1>
          <p className="text-gray-400">Real-time monitoring of your organization's performance</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all">
            <Calendar size={18} />
            Last 30 Days
          </button>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
            <Plus size={18} />
            New Report
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Revenue', value: '$248,500', change: '+18.5%', icon: DollarSign, color: 'text-emerald-500', trend: 'up' },
          { label: 'Active Projects', value: '48', change: '+4', icon: TrendingUp, color: 'text-blue-500', trend: 'up' },
          { label: 'Team Members', value: '156', change: '+12', icon: UsersIcon, color: 'text-purple-500', trend: 'up' },
          { label: 'Tracked Hours', value: '12,482h', change: '+842h', icon: Clock, color: 'text-amber-500', trend: 'up' },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#151619] border border-white/5 p-6 rounded-3xl hover:border-white/10 transition-all group"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 rounded-2xl bg-white/5">
                <stat.icon className={stat.color} size={24} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-bold ${stat.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                {stat.trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {stat.change}
              </div>
            </div>
            <p className="text-gray-400 text-sm mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-[#151619] border border-white/5 p-8 rounded-[2rem]">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-xl font-bold text-white">Revenue Overview</h3>
                <p className="text-gray-500 text-sm">Monthly revenue growth and projections.</p>
              </div>
              <select className="bg-white/5 border border-white/10 text-white rounded-xl px-4 py-2 text-sm focus:outline-none">
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
              </select>
            </div>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#151619] border border-white/5 p-8 rounded-[2rem]">
              <h3 className="text-lg font-bold text-white mb-6">Top Projects</h3>
              <div className="space-y-6">
                {[
                  { name: 'FinTrack Mobile', hours: 450, progress: 65, color: 'bg-emerald-500' },
                  { name: 'Enterprise Dash', hours: 280, progress: 40, color: 'bg-blue-500' },
                  { name: 'Marketing Site', hours: 120, progress: 100, color: 'bg-purple-500' },
                ].map((project, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium text-white">{project.name}</span>
                      <span className="text-gray-500">{project.hours}h</span>
                    </div>
                    <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden">
                      <div className={`${project.color} h-full`} style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-[#151619] border border-white/5 p-8 rounded-[2rem]">
              <h3 className="text-lg font-bold text-white mb-6">Team Workload</h3>
              <div className="space-y-6">
                {[
                  { name: 'Sarah Connor', task: 'Design System', status: 'Active', color: 'bg-emerald-500' },
                  { name: 'John Doe', task: 'API Dev', status: 'Active', color: 'bg-blue-500' },
                  { name: 'Emily Blunt', task: 'User Testing', status: 'Idle', color: 'bg-gray-500' },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${member.color}`} />
                      <div>
                        <p className="text-sm font-medium text-white">{member.name}</p>
                        <p className="text-[10px] text-gray-500">{member.task}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase text-gray-500">{member.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-[#151619] border border-white/5 p-8 rounded-[2rem]">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-white">Recent Activity</h3>
              <button className="text-emerald-500 text-xs font-bold hover:underline">View All</button>
            </div>
            <div className="space-y-6">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex gap-4">
                  <div className="relative">
                    <img 
                      src={`https://picsum.photos/seed/${activity.user}/40/40`} 
                      className="w-10 h-10 rounded-xl object-cover" 
                      alt={activity.user}
                      referrerPolicy="no-referrer"
                    />
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#151619] flex items-center justify-center ${
                      activity.type === 'success' ? 'bg-emerald-500' :
                      activity.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                    }`}>
                      {activity.type === 'success' ? <CheckCircle2 size={8} className="text-white" /> : <AlertCircle size={8} className="text-white" />}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      <span className="text-emerald-500">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500 truncate">{activity.target}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-[2rem] text-white shadow-xl shadow-emerald-500/20">
            <h3 className="text-xl font-bold mb-2">Upgrade to Pro</h3>
            <p className="text-white/80 text-sm mb-6">Get unlimited projects, advanced analytics, and priority support.</p>
            <button className="w-full py-3 bg-white text-emerald-600 rounded-2xl font-bold text-sm hover:bg-emerald-50 transition-all shadow-lg">
              Start Free Trial
            </button>
          </div>

          <div className="bg-[#151619] border border-white/5 p-8 rounded-[2rem]">
            <h3 className="text-lg font-bold text-white mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'New Project', icon: MoreHorizontal },
                { label: 'Invite Team', icon: UsersIcon },
                { label: 'Add Task', icon: CheckCircle2 },
                { label: 'Log Time', icon: Clock },
              ].map((action, i) => (
                <button key={i} className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-2xl transition-all group">
                  <action.icon size={20} className="text-gray-400 group-hover:text-emerald-500 transition-colors" />
                  <span className="text-[10px] font-bold text-gray-500 group-hover:text-white transition-colors">{action.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
