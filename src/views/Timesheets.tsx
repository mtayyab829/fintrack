import React from 'react';
import { motion } from 'motion/react';
import { 
  FileText, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  ChevronRight,
  MoreHorizontal,
  Download,
  Filter,
  Settings,
  HelpCircle,
  Plus,
  Calendar,
  Briefcase,
  CheckSquare,
  MousePointer2,
  Crown,
  ChevronDown,
  Sparkles,
  DollarSign
} from 'lucide-react';
import { View } from '../types';

interface TimesheetsProps {
  view?: View;
}

const timesheets = [
  { id: 1, user: 'Sarah Connor', period: 'Oct 16 - Oct 22', hours: '42:30', status: 'Approved', amount: '$1,275.00' },
  { id: 2, user: 'John Doe', period: 'Oct 16 - Oct 22', hours: '38:15', status: 'Pending', amount: '$1,147.50' },
  { id: 3, user: 'Emily Blunt', period: 'Oct 16 - Oct 22', hours: '40:00', status: 'Approved', amount: '$1,200.00' },
  { id: 4, user: 'Michael Scott', period: 'Oct 16 - Oct 22', hours: '45:20', status: 'Rejected', amount: '$1,360.00' },
];

const ViewEditTimesheet = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h1 className="text-2xl font-bold text-white">View & Edit Timesheet</h1>
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
          <Settings size={16} /> Settings
        </button>
        <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
          <HelpCircle size={16} /> How to use?
        </button>
        <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
          <Download size={16} /> Export
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all">
          <Plus size={18} /> Add time
        </button>
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
        <img src="https://picsum.photos/seed/sarah/32/32" className="w-5 h-5 rounded-full" alt="" />
        Sarah Connor
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400">
        <Briefcase size={16} /> Projects
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400">
        <CheckSquare size={16} /> Tasks
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400">
        <MousePointer2 size={16} /> Methods
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
        <Calendar size={16} /> Feb 23, 2026 – Mar 01, 2026
      </div>
      <div className="ml-auto flex gap-2">
        <button className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-indigo-400 hover:bg-indigo-500/10 transition-all">Edit</button>
        <button className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 flex items-center gap-2">
          Columns <ChevronDown size={14} />
        </button>
      </div>
    </div>

    <div className="grid grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-xl overflow-hidden">
      {[
        { label: 'Total Time', value: '1:00' },
        { label: 'Amount', value: '$0.00' },
        { label: 'Paid Leave', value: '0:00' },
        { label: 'Paid holiday', value: '0:00' },
        { label: 'Absent', value: '-' },
        { label: 'Holiday', value: '-' },
      ].map((stat, i) => (
        <div key={i} className="bg-[#151619] p-4 text-center">
          <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider mb-1">{stat.label}</p>
          <p className="text-lg font-bold text-white">{stat.value}</p>
        </div>
      ))}
    </div>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b border-white/5">
            <th className="p-4 font-bold">Date</th>
            <th className="p-4 font-bold">Time</th>
            <th className="p-4 font-bold">Manually added</th>
            <th className="p-4 font-bold">Project</th>
            <th className="p-4 font-bold">Task</th>
            <th className="p-4 font-bold">Amount</th>
            <th className="p-4 font-bold">Total Time</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/5 hover:bg-white/[0.02]">
            <td className="p-4 font-bold text-white">Mon, Feb 23</td>
            <td className="p-4 text-gray-400 font-mono">1:00</td>
            <td className="p-4 text-gray-400 font-mono">100%</td>
            <td className="p-4 text-gray-400">Getting Started with WebWork</td>
            <td className="p-4 text-gray-500">No task</td>
            <td className="p-4 text-gray-400 font-mono">0 USD</td>
            <td className="p-4 text-white font-bold font-mono">1:00</td>
          </tr>
          {[
            'Tue, Feb 24', 'Wed, Feb 25', 'Thu, Feb 26', 'Fri, Feb 27', 'Sat, Feb 28', 'Sun, Mar 1'
          ].map((date) => (
            <tr key={date} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
              <td className="p-4 text-gray-500">{date}</td>
              <td className="p-4 text-gray-600 font-mono">0:00</td>
              <td className="p-4 text-gray-600 font-mono">0%</td>
              <td className="p-4 text-gray-600">No Project</td>
              <td className="p-4 text-gray-600">No task</td>
              <td className="p-4 text-gray-600 font-mono">0 USD</td>
              <td className="p-4 text-gray-600 font-mono">0:00</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TimeEditor = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">Time Editor</h1>
        <HelpCircle size={18} className="text-gray-500" />
      </div>
      <div className="flex items-center gap-4">
        <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
          <Settings size={16} /> Settings
        </button>
        <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
          <HelpCircle size={16} /> How to use?
        </button>
        <button className="bg-white/5 border border-white/10 text-indigo-400 px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium hover:bg-indigo-500/10 transition-all">
          <Sparkles size={16} /> Smart Fill
        </button>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-all">
          <Plus size={18} /> Add time
        </button>
      </div>
    </div>

    <div className="flex flex-wrap gap-3">
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
        <img src="https://picsum.photos/seed/sarah/32/32" className="w-5 h-5 rounded-full" alt="" />
        Sarah Connor
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400">
        <Briefcase size={16} /> Projects
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400">
        <CheckSquare size={16} /> Tasks
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400">
        <MousePointer2 size={16} /> Methods
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400">
        <Clock size={16} /> Break Policy
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-400">
        <DollarSign size={16} /> Break Type
      </div>
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
        <Calendar size={16} /> Mar 01, 2026
      </div>
      <div className="ml-auto">
        <button className="px-3 py-1.5 border border-white/10 rounded-lg text-sm text-gray-400 flex items-center gap-2">
          Columns <ChevronDown size={14} />
        </button>
      </div>
    </div>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-500 border-b border-white/5">
            <th className="p-4 font-bold">Time</th>
            <th className="p-4 font-bold">Project</th>
            <th className="p-4 font-bold">Task</th>
            <th className="p-4 font-bold">Activity Description</th>
            <th className="p-4 font-bold">Total</th>
            <th className="p-4 font-bold"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {[
            { start: '08:00', end: '08:39', project: 'Getting Started with WebWork', total: '0:39' },
            { start: '08:39', end: '09:00', project: 'Getting Started with WebWork', total: '0:21' },
          ].map((row, i) => (
            <tr key={i} className="hover:bg-white/[0.02]">
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <input type="text" value={row.start} className="w-16 bg-white/5 border border-white/10 rounded px-2 py-1 text-center font-mono" />
                  <span className="text-gray-600">-</span>
                  <input type="text" value={row.end} className="w-16 bg-white/5 border border-white/10 rounded px-2 py-1 text-center font-mono" />
                </div>
              </td>
              <td className="p-4">
                <div className="relative">
                  <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 appearance-none text-gray-300">
                    <option>{row.project}</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </td>
              <td className="p-4">
                <div className="relative">
                  <select className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 appearance-none text-gray-500">
                    <option>Select Task</option>
                  </select>
                  <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                </div>
              </td>
              <td className="p-4">
                <input type="text" value="Getting Started with WebWork session" className="w-full bg-white/5 border border-white/10 rounded px-3 py-1.5 text-gray-300" />
              </td>
              <td className="p-4 font-mono text-white font-bold">{row.total}</td>
              <td className="p-4 text-right">
                <button className="p-1.5 hover:bg-white/10 rounded text-gray-500 hover:text-white">
                  <MoreHorizontal size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="flex justify-between items-center pt-4 border-t border-white/5">
      <span className="text-sm font-bold text-white">Total Time: 1:00</span>
    </div>
  </div>
);

const PlusFeaturePlaceholder = ({ title, description, imageType }: { title: string, description: string, imageType: 'log' | 'approval' }) => (
  <div className="flex flex-col items-center justify-center py-12 text-center max-w-2xl mx-auto">
    <div className="flex items-center gap-2 mb-4">
      <h1 className="text-3xl font-bold text-white">{title}</h1>
      <Crown className="text-amber-500" size={24} />
    </div>
    <p className="text-gray-400 text-sm leading-relaxed mb-8">
      {description}
    </p>
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/20 mb-12">
      Activate {title}
    </button>
    
    <div className="w-full bg-[#151619] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      {imageType === 'log' ? (
        <div className="p-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-white/5">
                <th className="pb-3">Member</th>
                <th className="pb-3">Time Entry Date</th>
                <th className="pb-3">Action</th>
                <th className="pb-3">Previous Time</th>
                <th className="pb-3">New Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Clara O.', date: 'Jul 17, 2025', action: 'Edited', prev: '10:00-12:00', new: '10:00-13:00', actionColor: 'text-indigo-400 bg-indigo-400/10' },
                { name: 'John H.', date: 'Jul 16, 2025', action: 'Added', prev: '-', new: '09:00-17:00', actionColor: 'text-emerald-400 bg-emerald-400/10' },
                { name: 'Emily P.', date: 'Jul 18, 2025', action: 'Deleted', prev: '08:30-12:30', new: '-', actionColor: 'text-red-400 bg-red-400/10' },
                { name: 'Jane R.', date: 'Jul 15, 2025', action: 'Edited', prev: '10:00-18:00', new: '10:00-17:00', actionColor: 'text-indigo-400 bg-indigo-400/10' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="py-3 flex items-center gap-2">
                    <img src={`https://picsum.photos/seed/${row.name}/32/32`} className="w-6 h-6 rounded-lg" alt="" />
                    <span className="text-white">{row.name}</span>
                  </td>
                  <td className="py-3 text-gray-500">{row.date}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.actionColor}`}>{row.action}</span>
                  </td>
                  <td className="py-3 text-gray-500 font-mono">{row.prev}</td>
                  <td className="py-3 text-gray-300 font-mono">{row.new}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="p-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-gray-500 border-b border-white/5">
                <th className="pb-3">Member</th>
                <th className="pb-3">Pay period</th>
                <th className="pb-3">Total time</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Submitted on</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { name: 'Liz Thompson', period: 'Sep 3 - Sep 9', time: '09:00', status: 'Approved', date: 'Sep 8, 2023', statusColor: 'bg-emerald-500 text-white' },
                { name: 'Ella Johnson', period: 'Sep 3, 2023 - Sep 9, 2023', time: '08:39', status: 'Rejected', date: 'Sep 8, 2023', statusColor: 'bg-red-500 text-white' },
                { name: 'James Evans', period: 'Sep 3, 2023 - Sep 9, 2023', time: '08:13', status: 'Open', date: 'Sep 8, 2023', statusColor: 'bg-gray-500 text-white' },
                { name: 'Chris Walter', period: 'Sep 3, 2023 - Sep 9, 2023', time: '07:57', status: 'Submitted', date: 'Sep 8, 2023', statusColor: 'bg-indigo-500 text-white' },
              ].map((row, i) => (
                <tr key={i}>
                  <td className="py-3 flex items-center gap-2">
                    <img src={`https://picsum.photos/seed/${row.name}/32/32`} className="w-6 h-6 rounded-lg" alt="" />
                    <span className="text-white">{row.name}</span>
                  </td>
                  <td className="py-3 text-gray-500">{row.period}</td>
                  <td className="py-3 text-gray-300 font-mono">{row.time}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${row.statusColor}`}>{row.status}</span>
                  </td>
                  <td className="py-3 text-gray-500">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  </div>
);

const Timesheets: React.FC<TimesheetsProps> = ({ view = 'timesheets' }) => {
  if (view === 'view-edit-timesheet') return <ViewEditTimesheet />;
  if (view === 'time-editor') return <TimeEditor />;
  if (view === 'time-edit-log') return (
    <PlusFeaturePlaceholder 
      title="Time Edit Log" 
      description="See time edit logs across your workspace. These include time added or edited by members for themselves or for other members. This feature is included in our Plus plan and above."
      imageType="log"
    />
  );
  if (view === 'timesheet-approval') return (
    <PlusFeaturePlaceholder 
      title="Timesheet Approval" 
      description="Turn on timesheet approvals so workspace members can submit their timesheets for a set period. Upon submission, you will be notified to approve or reject. This feature is included in our Plus plan and above."
      imageType="approval"
    />
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Timesheets</h1>
          <p className="text-gray-400">Review and approve team timesheets for the current period.</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-white/10 transition-all">
            <Filter size={18} />
            Filter
          </button>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20">
            <Download size={18} />
            Export All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Pending Approval', value: '12', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-500/10' },
          { label: 'Approved this week', value: '45', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
          { label: 'Rejected/Issues', value: '2', icon: AlertCircle, color: 'text-red-500', bg: 'bg-red-500/10' },
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
          <h3 className="text-lg font-bold text-white">Recent Timesheets</h3>
          <div className="flex gap-2">
            <button className="text-xs font-bold text-emerald-500 hover:underline">Approve All Pending</button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-sm border-b border-white/5">
                <th className="p-6 font-medium">Team Member</th>
                <th className="p-6 font-medium">Period</th>
                <th className="p-6 font-medium">Total Hours</th>
                <th className="p-6 font-medium">Amount</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {timesheets.map((sheet) => (
                <tr key={sheet.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors group">
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={`https://picsum.photos/seed/${sheet.user}/40/40`} 
                        className="w-10 h-10 rounded-xl object-cover" 
                        alt={sheet.user}
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-white font-medium">{sheet.user}</span>
                    </div>
                  </td>
                  <td className="p-6 text-gray-400">{sheet.period}</td>
                  <td className="p-6 text-white font-mono">{sheet.hours}</td>
                  <td className="p-6 text-white font-medium">{sheet.amount}</td>
                  <td className="p-6">
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                      sheet.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' :
                      sheet.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {sheet.status}
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

export default Timesheets;
