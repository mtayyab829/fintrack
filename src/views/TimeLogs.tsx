import React from 'react';
import { Search, Filter, Download, MoreHorizontal, CheckCircle2, Clock, AlertCircle } from 'lucide-react';

interface TimeLogsProps {
  onOpenManualEntry: () => void;
  searchQuery?: string;
}

const TimeLogs: React.FC<TimeLogsProps> = ({ onOpenManualEntry, searchQuery = '' }) => {
  const [activeTab, setActiveTab] = React.useState('all');

  const logs = [
    { id: 1, user: 'Alex Johnson', project: 'FinTrack Mobile', task: 'Auth UI', date: 'Oct 24, 2023', duration: '4h 20m', status: 'Approved' },
    { id: 2, user: 'Sarah Smith', project: 'Admin Dashboard', task: 'API Integration', date: 'Oct 24, 2023', duration: '6h 15m', status: 'Pending' },
    { id: 3, user: 'Mike Ross', project: 'Marketing Site', task: 'SEO Optimization', date: 'Oct 23, 2023', duration: '3h 45m', status: 'Approved' },
    { id: 4, user: 'Rachel Zane', project: 'FinTrack Mobile', task: 'Bug Fixing', date: 'Oct 23, 2023', duration: '5h 10m', status: 'Rejected' },
    { id: 5, user: 'Harvey Specter', project: 'Legal Portal', task: 'Document Review', date: 'Oct 22, 2023', duration: '2h 30m', status: 'Approved' },
  ];

  const filteredLogs = logs.filter(log => 
    (log.user.toLowerCase().includes(searchQuery.toLowerCase()) || 
     log.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
     log.task.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (activeTab === 'all' || log.status.toLowerCase() === activeTab.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Time Logs</h1>
        <div className="flex gap-3">
          <button className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-sm flex items-center gap-2 hover:bg-white/10 transition-all">
            <Download size={18} />
            Export CSV
          </button>
          <button 
            onClick={onOpenManualEntry}
            className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20"
          >
            Add Manual Entry
          </button>
        </div>
      </div>

      <div className="flex gap-4 border-b border-white/5">
        {['all', 'pending', 'approved', 'rejected'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-2 text-sm font-medium capitalize transition-all relative ${
              activeTab === tab ? 'text-emerald-500' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab} Logs
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>
        ))}
      </div>

      <div className="bg-[#151619] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Filter size={14} />
            Showing {filteredLogs.length} entries
          </div>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                <th className="px-6 py-4 font-medium">User</th>
                <th className="px-6 py-4 font-medium">Project & Task</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Duration</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium"></th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xs">
                        {log.user.charAt(0)}
                      </div>
                      <span className="text-white font-medium">{log.user}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-white font-medium">{log.project}</p>
                      <p className="text-gray-500 text-xs">{log.task}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-400">{log.date}</td>
                  <td className="px-6 py-4 font-mono text-gray-300">{log.duration}</td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                      log.status === 'Approved' ? 'bg-emerald-500/10 text-emerald-500' :
                      log.status === 'Pending' ? 'bg-amber-500/10 text-amber-500' :
                      'bg-red-500/10 text-red-500'
                    }`}>
                      {log.status === 'Approved' && <CheckCircle2 size={12} />}
                      {log.status === 'Pending' && <Clock size={12} />}
                      {log.status === 'Rejected' && <AlertCircle size={12} />}
                      {log.status}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-gray-500 hover:text-white transition-colors">
                      <MoreHorizontal size={18} />
                    </button>
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

export default TimeLogs;
