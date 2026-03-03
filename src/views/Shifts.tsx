import React from 'react';
import { 
  Plus, 
  HelpCircle, 
  Calendar,
  Clock,
  Users,
  MoreHorizontal,
  ChevronRight,
  ChevronDown,
  Layout,
  Zap
} from 'lucide-react';
import { motion } from 'motion/react';

const Shifts = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-white">Shifts</h2>
        <span className="text-amber-500">👑</span>
      </div>

      <div className="mb-12">
        <p className="text-gray-400 max-w-lg mx-auto mb-4">
          Create shifts for workspace members with distinct properties such as time, working days, recurring mode, and more.
        </p>
        <p className="text-indigo-400 font-medium">This feature is included in our Plus plan and above.</p>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-indigo-600/20 mb-16">
        Activate Shifts
      </button>

      <div className="w-full max-w-4xl relative">
        <div className="absolute inset-0 bg-indigo-600/5 blur-3xl rounded-full" />
        <div className="relative bg-[#151619] border border-white/5 rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/5">
            <div className="flex gap-4">
              <div className="w-24 h-4 bg-white/5 rounded" />
              <div className="w-24 h-4 bg-white/5 rounded" />
              <div className="w-24 h-4 bg-white/5 rounded" />
            </div>
            <div className="w-32 h-8 bg-indigo-600/20 rounded-lg" />
          </div>
          <div className="p-8">
            <div className="grid grid-cols-5 gap-4 mb-8">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                <div key={day} className="space-y-4">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">{day}</div>
                  <div className="h-32 bg-white/5 rounded-xl border border-white/5 p-3 flex flex-col justify-between">
                    <div className="w-full h-2 bg-indigo-500/20 rounded" />
                    <div className="w-2/3 h-2 bg-white/5 rounded" />
                  </div>
                </div>
              ))}
            </div>
            
            {/* Popover Mockup from screenshot */}
            <div className="absolute bottom-12 right-12 w-64 bg-[#1a1b1e] border border-indigo-500/30 rounded-2xl p-4 shadow-2xl text-left">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                <span className="text-xs font-bold text-white">Night Shift</span>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <Clock size={12} /> 9:00 PM - 4:00 AM
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <Calendar size={12} /> Mon, Tue, Wed, Thu, Fri
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-400">
                  <Zap size={12} /> Weekly
                </div>
              </div>
              <div className="flex -space-x-1 mb-4">
                {[1,2,3,4,5].map(i => (
                  <img key={i} src={`https://picsum.photos/seed/shift${i}/24/24`} className="w-6 h-6 rounded-full border-2 border-[#1a1b1e]" alt="m" referrerPolicy="no-referrer" />
                ))}
                <div className="w-6 h-6 rounded-full bg-white/5 border-2 border-[#1a1b1e] flex items-center justify-center text-[8px] text-gray-500">+15</div>
              </div>
              <button className="w-full py-2 bg-white/5 hover:bg-white/10 text-gray-300 rounded-lg text-[10px] font-bold transition-all">
                View and edit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shifts;
