import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Settings, 
  HelpCircle, 
  Video,
  MessageSquare,
  Hash,
  AtSign,
  Smile,
  Paperclip,
  Send,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  UserPlus,
  Bell,
  Monitor,
  Mic,
  Calendar,
  Clock,
  Layout,
  FileText,
  Star,
  Users,
  List
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const Communication = ({ 
  view = 'chat', 
  selectedMember, 
  onMemberSelect 
}: { 
  view?: string, 
  selectedMember?: { id: string, name: string, avatar?: string } | null,
  onMemberSelect?: (member: any) => void
}) => {
  const [activeTab, setActiveTab] = useState(view === 'video-meetings' ? 'Video Meetings' : 'Chat');

  const ChatView = () => (
    <div className="flex h-[calc(100vh-180px)] -m-8 overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">MT</div>
            <div className="flex-1">
              <h3 className="text-sm font-bold text-white truncate">Muhammad Tayyab</h3>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-gray-500">Active</span>
              </div>
            </div>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="Search: Muhammad's workspace" 
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-6">
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-all text-sm">
              <Star size={16} /> Saved Items
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-all text-sm">
              <FileText size={16} /> Files
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-all text-sm">
              <Hash size={16} /> All channels
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-all text-sm">
              <MessageSquare size={16} /> Direct Messages
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-all text-sm">
              <AtSign size={16} /> Threads
            </button>
          </div>

          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Channels</span>
              <ChevronDown size={14} className="text-gray-500" />
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-indigo-500/10 text-indigo-400 text-sm">
                <div className="flex items-center gap-2">
                  <Hash size={16} /> general
                </div>
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-white/5 transition-all text-sm">
                <Plus size={16} /> Create a channel
              </button>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">Direct Messages</span>
              <ChevronDown size={14} className="text-gray-500" />
            </div>
            <div className="space-y-1">
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:bg-white/5 transition-all text-sm">
                <div className="w-6 h-6 rounded-lg bg-indigo-500/20 flex items-center justify-center text-[10px] font-bold">AI</div>
                WebWork AI
              </button>
              <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg bg-white/5 text-white text-sm">
                <div className="relative">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[10px] font-bold text-emerald-400">MT</div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-500 border-2 border-[#0a0a0a]" />
                </div>
                Muhammad T...
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-gray-500 hover:bg-white/5 transition-all text-sm">
                <Plus size={16} /> Add teammates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-[#0f0f0f]">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center text-xs font-bold text-emerald-400">
              {selectedMember ? selectedMember.name.charAt(0) : 'MT'}
            </div>
            <h2 className="font-bold text-white">{selectedMember ? selectedMember.name : 'Muhammad Tayyab'}</h2>
            <div className="w-2 h-2 rounded-full bg-emerald-500" />
          </div>
          <div className="flex items-center gap-4 text-gray-500">
            <button className="hover:text-white transition-all"><Settings size={18} /></button>
            <button className="hover:text-white transition-all"><MoreHorizontal size={18} /></button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div className="w-64 h-64 mb-8 relative">
            <img src="https://abs.twimg.com/emoji/v2/72x72/1f4e9.png" className="w-full h-full opacity-20 grayscale" alt="empty" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-indigo-500/20 animate-pulse" />
            </div>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No messages</h3>
          <p className="text-gray-500 max-w-sm">Start a conversation with {selectedMember ? selectedMember.name : 'Muhammad Tayyab'} or invite more teammates to join.</p>
        </div>

        <div className="p-6">
          <div className="bg-[#151619] border border-white/10 rounded-2xl p-4">
            <div className="flex items-center gap-4 mb-4 text-gray-500 border-b border-white/5 pb-4">
              <button className="hover:text-white transition-all"><Layout size={18} /></button>
              <button className="hover:text-white transition-all font-bold">B</button>
              <button className="hover:text-white transition-all italic">I</button>
              <button className="hover:text-white transition-all line-through">S</button>
              <div className="w-px h-4 bg-white/10 mx-2" />
              <button className="hover:text-white transition-all"><List size={18} /></button>
              <button className="hover:text-white transition-all"><MoreHorizontal size={18} /></button>
            </div>
            <textarea 
              placeholder="Jot something down"
              className="w-full bg-transparent border-none focus:ring-0 text-sm text-white resize-none h-24 placeholder-gray-600"
            />
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-4 text-gray-500">
                <button className="hover:text-white transition-all"><Plus size={18} /></button>
                <button className="hover:text-white transition-all"><AtSign size={18} /></button>
                <button className="hover:text-white transition-all"><Smile size={18} /></button>
                <button className="hover:text-white transition-all"><Clock size={18} /></button>
              </div>
              <button className="p-2 bg-white/5 text-gray-600 rounded-lg hover:bg-indigo-600 hover:text-white transition-all">
                <Send size={18} />
              </button>
            </div>
          </div>
          <div className="mt-4 flex items-center justify-center gap-4 text-[10px] text-gray-500">
            <span>We strongly recommend enabling desktop notifications if you'll be using WebWork Team Chat on this computer.</span>
            <div className="flex gap-4">
              <button className="text-indigo-400 hover:underline">Enable notifications</button>
              <button className="hover:underline">Never ask again on this computer</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const VideoMeetingsView = () => (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex items-center gap-2 mb-8">
        <h2 className="text-3xl font-bold text-white">Video meetings</h2>
        <span className="text-amber-500">👑</span>
      </div>

      <div className="flex gap-8 border-b border-white/5 mb-24 w-full max-w-md justify-center">
        {['Upcoming', 'Personal Room'].map((tab) => (
          <button 
            key={tab}
            className={`pb-4 text-sm font-bold transition-all ${
              tab === 'Upcoming' ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mb-12">
        <div className="w-32 h-32 bg-white/5 rounded-3xl flex items-center justify-center mb-8 mx-auto border border-white/5">
          <Calendar size={64} className="text-gray-700" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">No Upcoming Meetings</h3>
        <p className="text-gray-500 max-w-sm mx-auto">You can either start an instant meeting or schedule a meeting.</p>
      </div>

      <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg shadow-indigo-600/20">
        <Video size={24} />
        New Meeting
      </button>
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
          className="h-full"
        >
          {activeTab === 'Chat' ? <ChatView /> : <VideoMeetingsView />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Communication;
