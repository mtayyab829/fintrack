import React from 'react';
import { ChevronLeft, ChevronRight, Plus, Clock, Calendar as CalendarIcon } from 'lucide-react';
import { motion } from 'motion/react';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const Calendar = () => {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
  
  const prevMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));

  const logs = [
    { day: 12, project: 'FinTrack', hours: '4.5h', color: 'bg-emerald-500' },
    { day: 15, project: 'Admin', hours: '6.2h', color: 'bg-blue-500' },
    { day: 15, project: 'Design', hours: '2.1h', color: 'bg-purple-500' },
    { day: 20, project: 'Security', hours: '5.0h', color: 'bg-red-500' },
    { day: 24, project: 'FinTrack', hours: '8.0h', color: 'bg-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Time Calendar</h1>
          <p className="text-gray-500 text-sm">Visualize your time logs and deadlines across the month.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-3 py-1.5">
            <button onClick={prevMonth} className="p-1 hover:text-emerald-500 transition-colors">
              <ChevronLeft size={20} />
            </button>
            <span className="text-sm font-bold min-w-[120px] text-center">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            <button onClick={nextMonth} className="p-1 hover:text-emerald-500 transition-colors">
              <ChevronRight size={20} />
            </button>
          </div>
          <button className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-sm font-bold flex items-center gap-2 shadow-lg shadow-emerald-500/20">
            <Plus size={18} />
            Log Time
          </button>
        </div>
      </div>

      <div className="bg-[#151619] border border-white/5 rounded-3xl overflow-hidden">
        <div className="grid grid-cols-7 border-b border-white/5">
          {days.map(day => (
            <div key={day} className="py-4 text-center text-gray-500 text-xs font-bold uppercase tracking-widest">
              {day}
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-7">
          {Array.from({ length: 42 }).map((_, i) => {
            const dayNumber = i - firstDayOfMonth + 1;
            const isCurrentMonth = dayNumber > 0 && dayNumber <= daysInMonth;
            const dayLogs = logs.filter(l => l.day === dayNumber);
            
            return (
              <div 
                key={i} 
                className={`min-h-[120px] p-2 border-r border-b border-white/5 last:border-r-0 relative group transition-colors ${
                  isCurrentMonth ? 'hover:bg-white/[0.02]' : 'bg-black/20'
                }`}
              >
                {isCurrentMonth && (
                  <>
                    <span className={`text-sm font-medium ${
                      dayNumber === new Date().getDate() && currentDate.getMonth() === new Date().getMonth()
                        ? 'bg-emerald-500 text-white w-7 h-7 flex items-center justify-center rounded-full'
                        : 'text-gray-400'
                    }`}>
                      {dayNumber}
                    </span>
                    
                    <div className="mt-2 space-y-1">
                      {dayLogs.map((log, idx) => (
                        <div key={idx} className={`${log.color}/10 border-l-2 border-${log.color.split('-')[1]}-500 px-2 py-1 rounded-r-md`}>
                          <p className="text-[10px] font-bold text-white truncate">{log.project}</p>
                          <p className="text-[9px] text-gray-500">{log.hours}</p>
                        </div>
                      ))}
                    </div>

                    <button className="absolute bottom-2 right-2 p-1 bg-emerald-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all shadow-lg shadow-emerald-500/20">
                      <Plus size={14} />
                    </button>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-500">
              <Clock size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Total Hours</p>
              <p className="text-xl font-bold text-white">164.5h</p>
            </div>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-500 h-full w-[75%]" />
          </div>
          <p className="text-[10px] text-gray-500 mt-2">75% of monthly goal reached</p>
        </div>

        <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-500">
              <CalendarIcon size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Days Tracked</p>
              <p className="text-xl font-bold text-white">18 / 22</p>
            </div>
          </div>
          <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[82%]" />
          </div>
          <p className="text-[10px] text-gray-500 mt-2">82% consistency this month</p>
        </div>

        <div className="bg-[#151619] border border-white/5 p-6 rounded-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-500">
              <Plus size={20} />
            </div>
            <div>
              <p className="text-gray-500 text-xs">Pending Approvals</p>
              <p className="text-xl font-bold text-white">4 Logs</p>
            </div>
          </div>
          <button className="w-full py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all">
            Review Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
