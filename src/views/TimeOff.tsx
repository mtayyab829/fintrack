import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  HelpCircle, 
  Calendar,
  Users,
  MoreHorizontal,
  LayoutGrid,
  List,
  Filter,
  Columns as ColumnsIcon,
  CheckSquare,
  AlertCircle,
  Download,
  Settings,
  Trash2,
  Edit2,
  ChevronRight,
  UserPlus,
  Clock,
  Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const TimeOff = ({ view = 'leave' }: { view?: string }) => {
  const [activeTab, setActiveTab] = useState(
    view === 'holidays' ? 'Holidays' : 
    view === 'leave-balance' ? 'Leave Balance' : 'Leave Management'
  );

  const HolidaysView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Holidays</h1>
          <HelpCircle size={18} className="text-gray-500 cursor-help" />
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-white text-sm flex items-center gap-1.5">
            <HelpCircle size={16} /> How to use?
          </button>
          <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
            <button className="p-1 rounded bg-white/10 text-white"><List size={16} /></button>
            <button className="p-1 rounded text-gray-500 hover:text-gray-300"><LayoutGrid size={16} /></button>
          </div>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
            <Plus size={18} />
            Add Holiday
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Users size={16} className="text-gray-500" /> Teams
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Calendar size={16} className="text-gray-500" /> Jan 01 – Dec 31
          </button>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search" 
            className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all w-64"
          />
        </div>
      </div>

      <div className="bg-[#151619] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Day Type</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Applies to</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Paid hours</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Channel</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5 transition-all group">
              <td className="px-6 py-4 text-sm text-white">jhk</td>
              <td className="px-6 py-4 text-sm text-gray-400">Mar 06 - Mar 07</td>
              <td className="px-6 py-4">
                <span className="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded text-[10px] font-bold">non-working</span>
              </td>
              <td className="px-6 py-4">
                <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded text-[10px] font-bold">Financial Analysis and Planning</span>
              </td>
              <td className="px-6 py-4 text-sm text-gray-500">-</td>
              <td className="px-6 py-4 text-sm text-gray-500">-</td>
              <td className="px-6 py-4 text-sm text-gray-500">-</td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="p-1.5 hover:bg-white/5 rounded-lg text-gray-500 hover:text-white"><Edit2 size={14} /></button>
                  <button className="p-1.5 hover:bg-red-500/10 rounded-lg text-gray-500 hover:text-red-500"><Trash2 size={14} /></button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  const LeaveManagementView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Leave Management</h1>
          <HelpCircle size={18} className="text-gray-500 cursor-help" />
        </div>
        <div className="flex items-center gap-4">
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-bold">Balance</button>
          <button className="text-gray-500 hover:text-white text-sm flex items-center gap-1.5">
            <Download size={16} /> Export
          </button>
          <button className="border border-indigo-500/30 text-indigo-400 px-4 py-2 rounded-lg text-sm font-bold hover:bg-indigo-500/5 transition-all">
            Add leave for a member
          </button>
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
            <Plus size={18} />
            Add leave
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex gap-8">
          {['Pending', 'Approved', 'Rejected', 'Deleted'].map((tab) => (
            <button 
              key={tab}
              className={`text-sm font-bold transition-all ${
                tab === 'Pending' ? 'text-indigo-400 border-b-2 border-indigo-400 pb-4 -mb-4.5' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
            <Settings size={14} /> Settings
          </button>
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
            <HelpCircle size={14} /> How to use?
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between py-4">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Users size={16} className="text-gray-500" /> Members
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Users size={16} className="text-gray-500" /> Teams
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Briefcase size={16} className="text-gray-500" /> Leave Policy
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Clock size={16} className="text-gray-500" /> Paid
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Calendar size={16} className="text-gray-500" /> Jan 01, 2026 – Dec 31, 2026
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
          />
        </div>
        <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
          Columns <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex flex-col items-center justify-center py-12 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Leave Management</h2>
        <p className="text-gray-400 max-w-lg mx-auto mb-8">
          Add, approve, and reject leave days when members request them, and view their leave balance. To add leave, you must first create Leave Policies.
        </p>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 mb-16">
          Create Leave Policy
        </button>

        <div className="w-full max-w-3xl relative">
          <div className="absolute inset-0 bg-indigo-600/5 blur-3xl rounded-full" />
          <div className="relative bg-[#151619] border border-white/5 rounded-3xl overflow-hidden p-8">
            <div className="grid grid-cols-4 gap-4 mb-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-left px-4">
              <div>Member</div>
              <div>Team</div>
              <div>Leave Policy</div>
              <div>Total</div>
            </div>
            <div className="space-y-4">
              {[
                { name: 'Wade Warren', team: 'Evistep Team', policy: 'Free day - 7', total: '8/20 d' },
                { name: 'Annette Lautner', team: 'Management Team', policy: 'Vacation - 8', total: '12/20 d' },
                { name: 'Jane Cooper', team: 'Marketing Team', policy: 'Vacation - 8', total: '3/20 d' },
              ].map((m, i) => (
                <div key={i} className="flex items-center bg-white/5 border border-white/5 rounded-xl p-4 text-left">
                  <div className="flex-1 grid grid-cols-4 gap-4 items-center">
                    <div className="flex items-center gap-3">
                      <img src={`https://picsum.photos/seed/leave${i}/32/32`} className="w-8 h-8 rounded-full" alt="m" referrerPolicy="no-referrer" />
                      <span className="text-sm font-medium text-white">{m.name}</span>
                    </div>
                    <div className="text-xs text-gray-500">{m.team}</div>
                    <div className="text-xs text-gray-500">{m.policy}</div>
                    <div className="text-xs text-gray-500 font-bold">{m.total}</div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Tooltip Mockup */}
            <div className="absolute top-1/2 right-12 w-48 bg-[#1a1b1e] border border-indigo-500/30 rounded-2xl p-4 shadow-2xl text-left">
              <div className="text-[10px] font-bold text-gray-500 uppercase mb-2">Pending</div>
              <div className="flex items-center gap-2 mb-3">
                <img src="https://picsum.photos/seed/alice/24/24" className="w-6 h-6 rounded-full" alt="m" referrerPolicy="no-referrer" />
                <span className="text-xs font-bold text-white">Alice James</span>
              </div>
              <div className="text-[10px] text-gray-400 mb-1">Nov 8 - Dec 12</div>
              <div className="text-[10px] text-indigo-400">Development Team</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const LeaveBalanceView = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Leave Balance</h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
            <Settings size={14} /> Settings
          </button>
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
            <HelpCircle size={14} /> How to use?
          </button>
          <button className="text-indigo-400 hover:text-indigo-300 text-sm font-bold">Requests</button>
          <button className="text-gray-500 hover:text-white text-sm flex items-center gap-1.5">
            <Download size={16} /> Export
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Users size={16} className="text-gray-500" /> Members
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Users size={16} className="text-gray-500" /> Teams
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Briefcase size={16} className="text-gray-500" /> Leave Policy
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Calendar size={16} className="text-gray-500" /> Jan 01, 2026 – Mar 03, 2026
          </button>
        </div>
      </div>

      <div className="flex items-center gap-6 mb-8">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="w-4 h-4 border border-white/20 rounded bg-white/5 group-hover:border-indigo-500 transition-all" />
          <span className="text-xs text-gray-400 group-hover:text-white transition-all">Currently on leave</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="w-4 h-4 border border-white/20 rounded bg-white/5 group-hover:border-indigo-500 transition-all" />
          <span className="text-xs text-gray-400 group-hover:text-white transition-all">Exclude archived</span>
        </label>
      </div>

      <div className="bg-[#151619] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Member</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Teams</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Leave Policy</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Used</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            <tr className="hover:bg-white/5 transition-all">
              <td className="px-6 py-4 text-sm text-white">Muhammad Tayyab</td>
              <td className="px-6 py-4 text-sm text-gray-500">-</td>
              <td className="px-6 py-4 text-sm text-gray-500">-</td>
              <td className="px-6 py-4 text-sm text-gray-500">-</td>
              <td className="px-6 py-4 text-sm text-gray-500 text-right">-</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Holidays' && <HolidaysView />}
          {activeTab === 'Leave Management' && <LeaveManagementView />}
          {activeTab === 'Leave Balance' && <LeaveBalanceView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TimeOff;
