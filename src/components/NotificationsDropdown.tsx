import React from 'react';
import { Bell, Clock, CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

const notifications = [
  { id: 1, title: 'Time Log Approved', desc: 'Your log for FinTrack Mobile was approved.', time: '2m ago', type: 'success', icon: CheckCircle2 },
  { id: 2, title: 'New Project Assigned', desc: 'You have been added to "Security Audit".', time: '1h ago', type: 'info', icon: Info },
  { id: 3, title: 'Missing Time Logs', desc: 'You haven\'t logged hours for yesterday.', time: '4h ago', type: 'warning', icon: AlertCircle },
  { id: 4, title: 'Payroll Processed', desc: 'Your monthly payout has been initiated.', time: '1d ago', type: 'success', icon: DollarSign },
];

import { DollarSign } from 'lucide-react';

const NotificationsDropdown: React.FC<NotificationsDropdownProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="absolute top-full right-0 mt-4 w-80 z-[100]">
        <motion.div 
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 10, scale: 0.95 }}
          className="bg-[#151619] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
        >
          <div className="p-4 border-b border-white/5 flex justify-between items-center">
            <h3 className="font-bold text-white flex items-center gap-2">
              <Bell size={16} className="text-emerald-500" />
              Notifications
            </h3>
            <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
              <X size={16} />
            </button>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.map((notif) => (
              <div key={notif.id} className="p-4 border-b border-white/5 hover:bg-white/[0.02] transition-colors cursor-pointer group">
                <div className="flex gap-3">
                  <div className={`mt-1 p-2 rounded-lg shrink-0 ${
                    notif.type === 'success' ? 'bg-emerald-500/10 text-emerald-500' :
                    notif.type === 'warning' ? 'bg-amber-500/10 text-amber-500' :
                    'bg-blue-500/10 text-blue-500'
                  }`}>
                    <notif.icon size={16} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-white group-hover:text-emerald-500 transition-colors">{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{notif.desc}</p>
                    <div className="flex items-center gap-1 mt-2 text-[10px] text-gray-600">
                      <Clock size={10} />
                      {notif.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full py-3 text-xs font-bold text-gray-500 hover:text-white hover:bg-white/5 transition-all">
            View All Notifications
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default NotificationsDropdown;
