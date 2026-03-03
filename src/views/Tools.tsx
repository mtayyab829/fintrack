import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  ChevronDown, 
  HelpCircle, 
  Calendar,
  Clock,
  Users,
  MessageSquare,
  MoreHorizontal,
  LayoutGrid,
  List,
  Filter,
  Columns as ColumnsIcon,
  CheckSquare,
  AlertCircle,
  Megaphone,
  Bell,
  Trash2,
  Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Standup {
  id: string;
  name: string;
  channel: string;
  members: number;
  time: string;
  days: string[];
}

interface Announcement {
  id: string;
  title: string;
  date: string;
  teams: string[];
}

const Tools = ({ view = 'standups' }: { view?: string }) => {
  const [activeTab, setActiveTab] = useState(view === 'announcements' ? 'Announcements' : 'Standups');

  const standups: Standup[] = [
    { id: '1', name: 'WebWork Sales', channel: 'webwork-sales', members: 3, time: '10:20', days: ['mon', 'tue', 'wed', 'fri'] },
    { id: '2', name: 'Front-end Devel...', channel: 'webwork-website', members: 3, time: '10:30', days: ['mon', 'wed', 'thu', 'fri'] },
    { id: '3', name: 'Marketing Stand...', channel: 'webwork-marketing', members: 3, time: '10:30', days: ['mon'] },
    { id: '4', name: 'Web Design Stan...', channel: 'web-design-review', members: 3, time: '10:40', days: ['mon'] },
  ];

  const announcements: Announcement[] = [
    { id: '1', title: "We're moving to new task management tool!", date: 'Apr 29 - Apr 31', teams: ['Marketing Team'] },
    { id: '2', title: 'Board meeting rescheduled next Monday.', date: 'May 2 - May 6', teams: ['Management Team'] },
    { id: '3', title: 'Design meeting tomorrow at 11AM.', date: 'May 8 - May 9', teams: ['Design Team'] },
  ];

  const StandupsView = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Standups</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Set standup reminders in your selected WebWork or Slack channel (when integrated) and they will be sent at your set time and frequency.
        </p>
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 mb-16">
        <Plus size={20} />
        Add standup
      </button>

      <div className="w-full max-w-5xl bg-[#151619] border border-white/5 rounded-2xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5">
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Channel</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Members</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Time</th>
              <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Standup Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {standups.map((s) => (
              <tr key={s.id} className="hover:bg-white/5 transition-all group">
                <td className="px-6 py-4 text-sm font-medium text-white">{s.name}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2 text-indigo-400 text-sm">
                    {s.channel} <div className="w-4 h-4 rounded-full bg-indigo-500/20 flex items-center justify-center text-[10px]">@</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <img src={`https://picsum.photos/seed/${s.id}1/32/32`} className="w-6 h-6 rounded-full border-2 border-[#151619]" alt="m" referrerPolicy="no-referrer" />
                      <img src={`https://picsum.photos/seed/${s.id}2/32/32`} className="w-6 h-6 rounded-full border-2 border-[#151619]" alt="m" referrerPolicy="no-referrer" />
                    </div>
                    <span className="text-xs text-gray-500">+{s.members - 2}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-300">{s.time}</td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(day => (
                      <span key={day} className={`text-[10px] px-1.5 py-0.5 rounded border ${
                        s.days.includes(day) ? 'bg-white/10 border-white/20 text-white' : 'border-white/5 text-gray-600'
                      }`}>
                        {day}
                      </span>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const AnnouncementsView = () => (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">Announcements</h2>
        <p className="text-gray-400 max-w-lg mx-auto">
          Add announcements for all workspace members or selected teams so they stay informed.
        </p>
      </div>
      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20 mb-16">
        <Plus size={20} />
        Add announcement
      </button>

      <div className="w-full max-w-4xl bg-[#151619] border border-white/5 rounded-2xl overflow-hidden p-8">
        <div className="grid grid-cols-3 gap-4 mb-6 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-left px-4">
          <div>Announcement</div>
          <div>Date</div>
          <div>Teams</div>
        </div>
        <div className="space-y-4">
          {announcements.map((a) => (
            <div key={a.id} className="flex items-center bg-white/5 border border-white/5 rounded-xl p-4 hover:border-indigo-500/30 transition-all group">
              <div className="flex-1 grid grid-cols-3 gap-4 items-center text-left">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400">
                    <AlertCircle size={18} />
                  </div>
                  <span className="text-sm font-medium text-white">{a.title}</span>
                </div>
                <div className="text-xs text-gray-500">{a.date}</div>
                <div className="flex items-center justify-between">
                  <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-lg text-xs text-gray-400">
                    {a.teams[0]}
                  </span>
                  <button className="text-gray-600 hover:text-white transition-all opacity-0 group-hover:opacity-100">
                    <MoreHorizontal size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">{activeTab}</h1>
          <HelpCircle size={18} className="text-gray-500 cursor-help" />
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
          <Plus size={18} />
          Add {activeTab === 'Standups' ? 'standup' : 'announcement'}
        </button>
      </div>

      <div className="flex items-center justify-between mb-8">
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Users size={16} className="text-gray-500" /> Teams
          </button>
          <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm text-gray-300 hover:bg-white/10 transition-all">
            <Calendar size={16} className="text-gray-500" /> Mar 01, 2026 – Mar 31, 2026
          </button>
        </div>
        <button className="text-gray-500 hover:text-white text-sm flex items-center gap-1.5">
          <HelpCircle size={16} /> How to use?
        </button>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {activeTab === 'Standups' ? <StandupsView /> : <AnnouncementsView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Tools;
