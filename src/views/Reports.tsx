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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { 
  Clock, 
  DollarSign, 
  Zap, 
  Timer, 
  Download, 
  Filter, 
  Search, 
  ChevronDown, 
  Users, 
  Briefcase, 
  Layers, 
  Type, 
  MousePointer2, 
  Monitor, 
  UserCheck, 
  Calendar,
  HelpCircle,
  MoreVertical,
  Crown,
  LayoutGrid,
  FileText,
  TrendingUp,
  AlertCircle,
  Settings,
  ExternalLink
} from 'lucide-react';
import { View } from '../types';

interface ReportsProps {
  view?: View;
  onViewChange: (view: View) => void;
}

// --- Shared Components ---

const ReportHeader = ({ title, description, actions }: { title: string, description?: string, actions?: React.ReactNode }) => (
  <div className="flex justify-between items-end mb-6">
    <div>
      <h1 className="text-2xl font-bold text-white mb-1">{title}</h1>
      {description && <p className="text-gray-400 text-sm">{description}</p>}
    </div>
    <div className="flex items-center gap-3">
      {actions}
      <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
        <Download size={16} /> Export
      </button>
    </div>
  </div>
);

const ReportFilters = ({ children }: { children?: React.ReactNode }) => (
  <div className="flex flex-wrap items-center gap-2 mb-6">
    {children}
    <div className="ml-auto flex items-center gap-2">
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
        <Calendar size={14} /> Feb 23, 2026 – Mar 01, 2026
      </div>
      <div className="relative">
        <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-300 appearance-none">
          <option>by day</option>
          <option>by week</option>
        </select>
        <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
      </div>
      <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5">
        <button className="px-3 py-1 text-xs font-bold text-white bg-white/10 rounded-md">Hours</button>
        <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:text-gray-300">Amount</button>
      </div>
      <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 flex items-center gap-2">
        Columns <ChevronDown size={14} />
      </button>
    </div>
  </div>
);

const FilterButton = ({ icon: Icon, label, active = false }: { icon: any, label: string, active?: boolean }) => (
  <button className={`bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm transition-all ${active ? 'text-white bg-white/10' : 'text-gray-400 hover:text-white'}`}>
    <Icon size={14} />
    {label}
  </button>
);

const PlusFeaturePlaceholder = ({ title, description, imageSrc }: { title: string, description: string, imageSrc?: string }) => (
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
    
    <div className="w-full bg-[#151619] border border-white/5 rounded-2xl p-8 shadow-2xl">
      <div className="space-y-4 opacity-40 grayscale">
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="h-4 bg-white/10 rounded w-4/6" />
        <div className="grid grid-cols-2 gap-4 mt-8">
          <div className="h-32 bg-white/5 rounded-xl border border-white/5" />
          <div className="h-32 bg-white/5 rounded-xl border border-white/5" />
        </div>
      </div>
    </div>
  </div>
);

// --- Individual Report Views ---

const TrackedHoursReport = () => (
  <div className="space-y-6">
    <ReportHeader title="Tracked Hours" />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Tracked Hours</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Chart</button>
      <div className="ml-auto pb-2">
        <button className="text-gray-500 hover:text-gray-300 flex items-center gap-1.5 text-sm">
          <HelpCircle size={14} /> How to use?
        </button>
      </div>
    </div>
    <ReportFilters>
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Briefcase} label="Projects" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <FilterButton icon={MousePointer2} label="Method" />
      <FilterButton icon={Monitor} label="Kiosks" />
      <FilterButton icon={UserCheck} label="Customers" />
      <FilterButton icon={Users} label="Project Viewer" />
    </ReportFilters>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400 border-b border-white/5 bg-white/[0.02]">
            <th className="p-4 font-bold">Member</th>
            <th className="p-4 font-bold">Project</th>
            <th className="p-4 font-bold">Feb 23, Mon</th>
            <th className="p-4 font-bold">Feb 24, Tue</th>
            <th className="p-4 font-bold">Feb 25, Wed</th>
            <th className="p-4 font-bold">Feb 26, Thu</th>
            <th className="p-4 font-bold">Feb 27, Fri</th>
            <th className="p-4 font-bold">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/5 hover:bg-white/[0.02]">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <img src="https://picsum.photos/seed/tayyab/32/32" className="w-8 h-8 rounded-lg" alt="" />
                <span className="text-white font-medium">Muhammad Tayyab</span>
              </div>
            </td>
            <td className="p-4 text-gray-400">Getting Started with WebWork</td>
            <td className="p-4">
              <div className="bg-indigo-500/20 text-indigo-300 px-3 py-1.5 rounded-md border border-indigo-500/30 font-mono text-center">1:00</div>
            </td>
            <td className="p-4 text-gray-600 font-mono text-center">-</td>
            <td className="p-4 text-gray-600 font-mono text-center">-</td>
            <td className="p-4 text-gray-600 font-mono text-center">-</td>
            <td className="p-4 text-gray-600 font-mono text-center">-</td>
            <td className="p-4 text-white font-bold font-mono text-center">2:00</td>
          </tr>
          <tr className="bg-white/[0.01]">
            <td colSpan={2} className="p-4 font-bold text-white">Total</td>
            <td className="p-4 text-white font-bold font-mono text-center">1:00</td>
            <td className="p-4 text-gray-600 font-mono text-center">-</td>
            <td className="p-4 text-gray-600 font-mono text-center">-</td>
            <td className="p-4 text-gray-600 font-mono text-center">-</td>
            <td className="p-4 text-gray-600 font-mono text-center">-</td>
            <td className="p-4 text-white font-bold font-mono text-center">2:00</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const TimelineReport = () => (
  <div className="space-y-6">
    <ReportHeader title="Timeline" />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Daily Visual</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Data Table</button>
    </div>
    <ReportFilters>
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Briefcase} label="Projects" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <FilterButton icon={UserCheck} label="Customers" />
      <FilterButton icon={Users} label="Project Viewer" />
      <FilterButton icon={Monitor} label="Kiosks" />
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
        <Calendar size={14} /> Mar 01, 2026
      </div>
    </ReportFilters>

    <div className="flex flex-wrap gap-4 mb-6">
      {[
        { label: 'Desktop', color: 'bg-emerald-500' },
        { label: 'Manually added', color: 'bg-pink-500' },
        { label: 'Mobile', color: 'bg-blue-500' },
        { label: 'Web', color: 'bg-indigo-500' },
        { label: 'Extension', color: 'bg-cyan-500' },
        { label: 'Kiosk', color: 'bg-teal-500' },
        { label: 'Idle', color: 'bg-gray-500' },
        { label: 'Paid leave', color: 'bg-orange-500' },
        { label: 'Paid break', color: 'bg-amber-500' },
        { label: 'Paid holiday', color: 'bg-lime-500' },
      ].map((legend) => (
        <div key={legend.label} className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          <div className={`w-3 h-3 rounded-sm ${legend.color}`} />
          {legend.label}
        </div>
      ))}
    </div>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left min-w-[1200px]">
          <thead>
            <tr className="text-gray-400 border-b border-white/5 bg-white/[0.02]">
              <th className="p-4 font-bold w-48">Member</th>
              <th className="p-4 font-bold w-64">Project</th>
              <th className="p-4 font-bold w-24">Time</th>
              {[
                '08:00', '08:15', '08:30', '08:45', '09:00', '09:15', '09:30', '09:45', '10:00', '10:15', '10:30', '10:45'
              ].map((time) => (
                <th key={time} className="p-2 font-bold text-center text-[10px]">{time}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/tayyab/32/32" className="w-8 h-8 rounded-lg" alt="" />
                  <span className="text-white font-medium">Muhammad Tayyab</span>
                </div>
              </td>
              <td className="p-4 text-gray-400">Getting Started with WebWork</td>
              <td className="p-4 text-white font-mono">1:00</td>
              <td colSpan={12} className="p-4">
                <div className="h-6 w-full bg-white/5 rounded-md relative overflow-hidden flex">
                  <div className="h-full bg-pink-500 w-1/4 ml-[33%]" />
                  <div className="h-full bg-pink-500 w-1/6 ml-1" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const AttendanceReport = () => (
  <div className="space-y-6">
    <ReportHeader title="Attendance" actions={
      <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
        <Settings size={16} /> Settings
      </button>
    } />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Daily</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Custom Interval</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Chart</button>
    </div>
    <div className="flex items-center gap-2 mb-6">
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
        <Calendar size={14} /> Mar 01, 2026
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 pr-8 text-sm text-gray-300 appearance-none">
            <option>All Members</option>
          </select>
          <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
        <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 flex items-center gap-2">
          Columns <ChevronDown size={14} />
        </button>
      </div>
    </div>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400 border-b border-white/5 bg-white/[0.02]">
            <th className="p-4 font-bold">Member</th>
            <th className="p-4 font-bold">Status</th>
            <th className="p-4 font-bold">Start time</th>
            <th className="p-4 font-bold">End time</th>
            <th className="p-4 font-bold">Total time</th>
            <th className="p-4 font-bold">Tracked time</th>
            <th className="p-4 font-bold">Activity level</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/5 hover:bg-white/[0.02]">
            <td className="p-4">
              <div className="flex items-center gap-3">
                <img src="https://picsum.photos/seed/tayyab/32/32" className="w-8 h-8 rounded-lg" alt="" />
                <span className="text-white font-medium">Muhammad Tayyab</span>
              </div>
            </td>
            <td className="p-4 text-gray-600">-</td>
            <td className="p-4 text-gray-300 font-mono">08:00</td>
            <td className="p-4 text-gray-300 font-mono">09:00</td>
            <td className="p-4 text-gray-300 font-mono">1:00</td>
            <td className="p-4 text-gray-300 font-mono">0:00</td>
            <td className="p-4 text-gray-600">-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const NoDataView = ({ title, description }: { title: string, description: string }) => (
  <div className="flex flex-col items-center justify-center py-32 text-center">
    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6">
      <Search size={32} className="text-indigo-500/50" />
    </div>
    <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
    <p className="text-gray-500">{description}</p>
  </div>
);

const ActivityLevelReport = () => (
  <div className="space-y-6">
    <ReportHeader title="Activity Level" actions={
      <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
        <Settings size={16} /> Settings
      </button>
    } />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Activity Level</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Chart</button>
    </div>
    <ReportFilters>
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Briefcase} label="Projects" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <FilterButton icon={UserCheck} label="Customers" />
    </ReportFilters>
    <NoDataView title="No Data" description="Try adjusting your filters to see results." />
  </div>
);

const ActivityDescriptionReport = () => (
  <div className="space-y-6">
    <ReportHeader title="Activity Description" />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Activity Description</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Chart</button>
    </div>
    <div className="flex items-center gap-2 mb-6">
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Briefcase} label="Projects" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <FilterButton icon={MousePointer2} label="Method" />
      <FilterButton icon={UserCheck} label="Customers" />
      <FilterButton icon={Users} label="Project Viewer" />
      <div className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 flex items-center gap-2 text-sm text-gray-300">
        <Calendar size={14} /> Feb 23, 2026 – Mar 01, 2026
      </div>
      <div className="ml-auto flex items-center gap-2">
        <div className="relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input type="text" placeholder="Search..." className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-sm text-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500" />
        </div>
        <div className="flex bg-white/5 border border-white/10 rounded-lg p-0.5">
          <button className="px-3 py-1 text-xs font-bold text-white bg-white/10 rounded-md">Hours</button>
          <button className="px-3 py-1 text-xs font-bold text-gray-500 hover:text-gray-300">Amount</button>
        </div>
        <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 flex items-center gap-2">
          Columns <ChevronDown size={14} />
        </button>
      </div>
    </div>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400 border-b border-white/5 bg-white/[0.02]">
            <th className="p-4 font-bold">Activity Description</th>
            <th className="p-4 font-bold">Project</th>
            <th className="p-4 font-bold">Member</th>
            <th className="p-4 font-bold">Method</th>
            <th className="p-4 font-bold">Date</th>
            <th className="p-4 font-bold">Duration</th>
          </tr>
        </thead>
        <tbody>
          {[
            { date: 'Feb 23, 2026' },
            { date: 'Mar 1, 2026' },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="p-4 text-gray-500 italic">No description</td>
              <td className="p-4 text-gray-400">Getting Started with WebWork</td>
              <td className="p-4 text-white">Muhammad Tayyab</td>
              <td className="p-4 text-gray-400">Manually added time</td>
              <td className="p-4 text-gray-400">{row.date}</td>
              <td className="p-4 text-white font-bold font-mono">1:00</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="pt-4 text-sm font-bold text-white">Total: 2:00</div>
  </div>
);

const AppsWebsitesReport = () => (
  <div className="space-y-6">
    <ReportHeader title="App and Website Usage" actions={
      <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
        Set up
      </button>
    } />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Overview</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Chart</button>
    </div>
    <ReportFilters>
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Briefcase} label="Projects" />
      <FilterButton icon={Monitor} label="Apps & Websites" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <FilterButton icon={TrendingUp} label="Productivity" />
      <FilterButton icon={LayoutGrid} label="Categories" />
      <FilterButton icon={UserCheck} label="Customers" />
    </ReportFilters>
    <div className="flex items-center gap-2 mb-6">
      <input type="checkbox" id="apps-only" className="rounded border-white/10 bg-white/5 text-indigo-500" defaultChecked />
      <label htmlFor="apps-only" className="text-sm text-gray-400">Apps & websites only</label>
    </div>
    <NoDataView title="No Data" description="Try adjusting your filters to see results." />
  </div>
);

const TasksReport = () => (
  <div className="space-y-6">
    <ReportHeader title="Tasks Report" actions={
      <button className="text-gray-400 hover:text-white flex items-center gap-1.5 text-sm">
        Manage Tasks
      </button>
    } />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Task</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Chart</button>
    </div>
    <ReportFilters>
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Briefcase} label="Projects" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <FilterButton icon={FileText} label="Tasks" />
      <FilterButton icon={MousePointer2} label="Methods" />
      <FilterButton icon={UserCheck} label="Customers" />
      <FilterButton icon={Users} label="Project Viewer" />
    </ReportFilters>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400 border-b border-white/5 bg-white/[0.02]">
            <th className="p-4 font-bold">Task</th>
            <th className="p-4 font-bold">Project</th>
            <th className="p-4 font-bold">Member</th>
            <th className="p-4 font-bold">Created Date</th>
            <th className="p-4 font-bold">Duration</th>
          </tr>
        </thead>
        <tbody>
          {[
            { date: 'Feb 23, 2026' },
            { date: 'Mar 1, 2026' },
          ].map((row, i) => (
            <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02]">
              <td className="p-4 text-gray-500 italic">(no task)</td>
              <td className="p-4 text-gray-400">Getting Started with WebWork</td>
              <td className="p-4 text-white">Muhammad Tayyab</td>
              <td className="p-4 text-gray-400">{row.date}</td>
              <td className="p-4 text-white font-bold font-mono">1:00</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <div className="pt-4 text-sm font-bold text-white">Total: 2:00</div>
  </div>
);

const BillableHoursReport = () => (
  <div className="space-y-6">
    <ReportHeader title="Billable Hours" />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Billable Hours</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Chart</button>
    </div>
    <ReportFilters>
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Users} label="Member Source" />
      <FilterButton icon={Briefcase} label="Projects" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <FilterButton icon={Clock} label="Tracking Methods" />
      <FilterButton icon={DollarSign} label="Payment Methods" />
      <FilterButton icon={UserCheck} label="Customers" />
      <FilterButton icon={Users} label="Project Viewer" />
    </ReportFilters>

    <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
      <table className="w-full text-sm text-left">
        <thead>
          <tr className="text-gray-400 border-b border-white/5 bg-white/[0.02]">
            <th className="p-4 font-bold">Member</th>
            <th className="p-4 font-bold">Activity description</th>
            <th className="p-4 font-bold">Hourly Rate</th>
            <th className="p-4 font-bold">Hours</th>
            <th className="p-4 font-bold">Total Amount (USD)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-white/5 hover:bg-white/[0.02]">
            <td className="p-4 text-white">Muhammad Tayyab</td>
            <td className="p-4 text-gray-500 italic">No description</td>
            <td className="p-4 text-gray-400 font-mono">0 USD</td>
            <td className="p-4 text-gray-300 font-mono">1:00</td>
            <td className="p-4 text-white font-bold font-mono">0</td>
          </tr>
          <tr className="border-b border-white/5 hover:bg-white/[0.02]">
            <td className="p-4 text-white">Muhammad Tayyab</td>
            <td className="p-4 text-gray-400">Getting Started with WebWork s</td>
            <td className="p-4 text-gray-400 font-mono">0 USD</td>
            <td className="p-4 text-gray-300 font-mono">1:00</td>
            <td className="p-4 text-white font-bold font-mono">0</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
);

const BreaksReport = () => (
  <div className="space-y-6">
    <ReportHeader title="Breaks Report" />
    <div className="flex gap-6 border-b border-white/5 mb-6">
      <button className="pb-2 text-indigo-400 border-b-2 border-indigo-400 text-sm font-medium">Breaks</button>
      <button className="pb-2 text-gray-500 hover:text-gray-300 text-sm font-medium">Chart</button>
      <div className="ml-auto pb-2">
        <button className="text-gray-500 hover:text-gray-300 flex items-center gap-1.5 text-sm">
          <HelpCircle size={14} /> How to use?
        </button>
      </div>
    </div>
    <ReportFilters>
      <FilterButton icon={Users} label="Members" />
      <FilterButton icon={Layers} label="Teams" />
      <FilterButton icon={Type} label="Titles" />
      <FilterButton icon={Timer} label="Break Policy" />
      <FilterButton icon={UserCheck} label="Customers" />
    </ReportFilters>
    <NoDataView title="No Data" description="No break records found for the selected period." />
  </div>
);

const AllReportsView = ({ onViewChange }: { onViewChange: (view: View) => void }) => {
  const reports = [
    { id: 'tracked-hours', title: 'Tracked Hours', image: 'https://picsum.photos/seed/tracked/400/250' },
    { id: 'timeline', title: 'Timeline', image: 'https://picsum.photos/seed/timeline/400/250' },
    { id: 'attendance', title: 'Attendance', image: 'https://picsum.photos/seed/attendance/400/250' },
    { id: 'activity-level', title: 'Activity Level', image: 'https://picsum.photos/seed/activity/400/250' },
    { id: 'activity-description', title: 'Activity Description', image: 'https://picsum.photos/seed/desc/400/250' },
    { id: 'apps-websites-report', title: 'Apps And Websites Usage', image: 'https://picsum.photos/seed/apps/400/250' },
    { id: 'tasks-report', title: 'Tasks', image: 'https://picsum.photos/seed/tasks/400/250' },
    { id: 'breaks', title: 'Breaks', image: 'https://picsum.photos/seed/breaks/400/250' },
    { id: 'billable-hours', title: 'Billable Hours', image: 'https://picsum.photos/seed/billable/400/250' },
    { id: 'project-budgeting', title: 'Project Budgeting', image: 'https://picsum.photos/seed/budget/400/250' },
    { id: 'payroll-report', title: 'Payroll', image: 'https://picsum.photos/seed/payroll/400/250' },
  ];

  return (
    <div className="space-y-6">
      <ReportHeader title="Reports" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-[#151619] border border-white/5 rounded-3xl overflow-hidden group hover:border-indigo-500/30 transition-all">
            <div className="p-6 pb-0 flex justify-between items-start">
              <h3 className="text-lg font-bold text-white">{report.title}</h3>
              <button 
                onClick={() => onViewChange(report.id as View)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-lg text-xs font-bold transition-all"
              >
                View More
              </button>
            </div>
            <div className="p-6">
              <div className="aspect-[16/10] bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative">
                <img src={report.image} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#151619] to-transparent opacity-40" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Reports: React.FC<ReportsProps> = ({ view = 'reports', onViewChange }) => {
  if (view === 'tracked-hours') return <TrackedHoursReport />;
  if (view === 'timeline') return <TimelineReport />;
  if (view === 'attendance') return <AttendanceReport />;
  if (view === 'activity-level') return <ActivityLevelReport />;
  if (view === 'activity-description') return <ActivityDescriptionReport />;
  if (view === 'apps-websites-report') return <AppsWebsitesReport />;
  if (view === 'tasks-report') return <TasksReport />;
  if (view === 'billable-hours') return <BillableHoursReport />;
  if (view === 'breaks') return <BreaksReport />;
  
  if (view === 'project-budgeting') return (
    <PlusFeaturePlaceholder 
      title="Project Budgeting" 
      description="Monitor project budgets and see how they are spent by members and tasks. Navigate between Datagrid, Project Overview, and Summary tabs for different levels of budget monitoring. This feature is included in our Plus plan and above."
    />
  );
  if (view === 'payroll-report') return (
    <PlusFeaturePlaceholder 
      title="Payroll" 
      description="See the list and statuses of made payments in table and chart views. This feature is included in our Plus plan and above."
    />
  );
  if (view === 'unified-reporting') return (
    <PlusFeaturePlaceholder 
      title="Unified Reporting" 
      description="View all your reports in one place. Get a complete overview of your team's performance and progress. Here, you'll see reports based on your selected entity. This feature is included in our Plus plan and above."
    />
  );
  if (view === 'scheduled-reports') return (
    <PlusFeaturePlaceholder 
      title="Scheduled Reports" 
      description="On Scheduled Reports, you can see scheduled reports with details like title, report, frequency, recipient, and status. You can also edit, pause, and delete them. This feature is included in our Plus plan and above."
    />
  );

  if (view === 'all-reports' || view === 'reports') return <AllReportsView onViewChange={onViewChange} />;

  // Default Dashboard view (from original implementation)
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Reports</h1>
        <div className="flex gap-2">
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
            <option>All Projects</option>
          </select>
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-sm">
            <option>This Month</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Hours', value: '1,240h', icon: Clock, color: 'text-blue-500' },
          { label: 'Billable Amount', value: '$42,500', icon: DollarSign, color: 'text-emerald-500' },
          { label: 'Productivity', value: '92%', icon: Zap, color: 'text-amber-500' },
          { label: 'Idle Time', value: '4h 20m', icon: Timer, color: 'text-red-500' },
        ].map((stat, i) => (
          <div key={i} className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
            <div className="flex items-center gap-4 mb-2">
              <stat.icon className={stat.color} size={20} />
              <span className="text-gray-400 text-sm">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Hours Tracked per Day</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Mon', hours: 45 },
                { name: 'Tue', hours: 52 },
                { name: 'Wed', hours: 48 },
                { name: 'Thu', hours: 61 },
                { name: 'Fri', hours: 55 },
                { name: 'Sat', hours: 20 },
                { name: 'Sun', hours: 15 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Bar dataKey="hours" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
          <h3 className="text-lg font-bold mb-6">Efficiency Breakdown</h3>
          <div className="h-80 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={[
                    { name: 'Billable', value: 75, color: '#10b981' },
                    { name: 'Non-Billable', value: 25, color: '#3b82f6' },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={80}
                  outerRadius={120}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {[
                    { name: 'Billable', value: 75, color: '#10b981' },
                    { name: 'Non-Billable', value: 25, color: '#3b82f6' },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#151619', border: '1px solid #ffffff10', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
