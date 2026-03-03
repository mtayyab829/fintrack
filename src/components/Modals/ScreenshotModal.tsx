import React from 'react';
import { X, Download, Share2, Trash2, Maximize2, Clock, User, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ScreenshotModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string;
}

const ScreenshotModal: React.FC<ScreenshotModalProps> = ({ isOpen, onClose, imageUrl }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/90 backdrop-blur-md" 
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="w-full max-w-6xl relative z-10 flex flex-col lg:flex-row bg-[#151619] rounded-3xl overflow-hidden shadow-2xl border border-white/10"
        >
          <div className="flex-1 bg-black flex items-center justify-center relative group">
            <img 
              src={imageUrl} 
              alt="Screenshot Preview" 
              className="max-w-full max-h-[70vh] lg:max-h-[85vh] object-contain"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="p-2 bg-black/60 backdrop-blur-md rounded-lg text-white hover:bg-emerald-500 transition-colors">
                <Maximize2 size={20} />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-80 p-8 flex flex-col border-t lg:border-t-0 lg:border-l border-white/10">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-xl font-bold text-white">Screenshot Info</h3>
              <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-gray-500 hover:text-white">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-6 flex-1">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-400">
                  <User size={18} className="text-emerald-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider">User</p>
                    <p className="text-sm text-white font-medium">Alex Johnson</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Clock size={18} className="text-blue-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider">Captured At</p>
                    <p className="text-sm text-white font-medium">Oct 24, 2023 • 10:42 AM</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Monitor size={18} className="text-purple-500" />
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider">App / Window</p>
                    <p className="text-sm text-white font-medium">Visual Studio Code</p>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                <p className="text-[10px] uppercase font-bold tracking-wider text-gray-500 mb-2">Activity Score</p>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-emerald-500">88%</span>
                  <span className="text-xs text-gray-500 mb-1">High Productivity</span>
                </div>
              </div>
            </div>

            <div className="pt-8 space-y-3">
              <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                <Download size={18} />
                Download
              </button>
              <div className="grid grid-cols-2 gap-3">
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Share2 size={18} />
                </button>
                <button className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/20 py-3 rounded-xl transition-all flex items-center justify-center gap-2">
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ScreenshotModal;
