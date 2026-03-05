import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, 
  UserPlus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  ChevronDown, 
  HelpCircle, 
  Download, 
  Plus, 
  Mail, 
  MessageSquare,
  Shield, 
  Briefcase, 
  Layers, 
  UserCheck, 
  Globe, 
  Monitor, 
  Edit2, 
  Trash2, 
  X,
  Maximize2,
  Minimize2,
  ExternalLink,
  Settings,
  User,
  LayoutGrid,
  List,
  CheckCircle2,
  AlertCircle,
  Clock,
  DollarSign
} from 'lucide-react';
import { View } from '../types';

interface PeopleProps {
  view?: View;
  onOpenInvite?: () => void;
  searchQuery?: string;
  onMemberClick?: (member: {id: string, name: string, avatar?: string}) => void;
  onChatClick?: (member: {id: string, name: string, avatar?: string}) => void;
}

// --- Shared Components ---

const PeopleHeader = ({ title, actions, subtitle }: { title: string, actions?: React.ReactNode, subtitle?: string }) => (
  <div className="flex justify-between items-end mb-6">
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <HelpCircle size={18} className="text-gray-500 cursor-help" />
      </div>
      {subtitle && <p className="text-gray-400 text-sm mt-1">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-3">
      {actions}
      <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
        <HelpCircle size={14} /> How to use?
      </button>
    </div>
  </div>
);

const FilterButton = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 hover:bg-white/10 transition-all">
    <Icon size={14} className="text-gray-500" />
    {label}
  </button>
);

// --- Members View ---

const MembersView = ({ onOpenInvite, onMemberClick, onChatClick }: { onOpenInvite?: () => void, onMemberClick?: (member: any) => void, onChatClick?: (member: any) => void }) => {
  const [activeTab, setActiveTab] = useState('Members');

  const members = [
    { id: 'muhammad', name: 'Muhammad Tayyab', email: 'muhammadtayyab2928@...', avatar: 'https://picsum.photos/seed/muhammad/40/40', role: 'Owner', project: 'Getting Started with We...', title: 'Financial Analyst' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-2xl font-bold text-white">Members</h1>
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
            <Download size={14} /> Export
          </button>
          <button 
            onClick={onOpenInvite}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            Invite
          </button>
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5 ml-2">
            <HelpCircle size={14} /> How to use?
          </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-white/5 mb-6">
        {['Members', 'Onboarding Status', 'Archived'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold transition-all ${
              activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab} {tab === 'Members' && <span className="ml-1 bg-white/10 px-1.5 py-0.5 rounded text-[10px]">1</span>}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-3 mb-6">
        <FilterButton icon={Users} label="Members" />
        <FilterButton icon={Briefcase} label="Projects" />
        <FilterButton icon={UserCheck} label="Member Type" />
        <FilterButton icon={Settings} label="Status" />
        <FilterButton icon={Globe} label="Member Source" />
        
        <div className="ml-auto flex items-center gap-3">
          <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 flex items-center gap-2">
            Bulk Actions <ChevronDown size={14} />
          </button>
          <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 flex items-center gap-2">
            Columns <ChevronDown size={14} />
          </button>
        </div>
      </div>

      <div className="bg-[#151619] border border-white/5 rounded-xl overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="text-gray-400 border-b border-white/5 bg-white/[0.02]">
              <th className="p-4 font-bold">Member <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="p-4 font-bold">Member Limit <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="p-4 font-bold">Hourly Rate <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="p-4 font-bold">Member Type <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="p-4 font-bold">Project <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="p-4 font-bold">Team <ChevronDown size={14} className="inline ml-1" /></th>
              <th className="p-4 font-bold">Job Title <ChevronDown size={14} className="inline ml-1" /></th>
            </tr>
          </thead>
          <tbody>
            {members.map((m) => (
              <tr key={m.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                <td className="p-4">
                  <div 
                    className="flex items-center gap-3 cursor-pointer group"
                    onClick={() => onMemberClick?.({ id: m.id, name: m.name, avatar: m.avatar })}
                  >
                    <img 
                      src={m.avatar}
                      className="w-10 h-10 rounded-xl object-cover group-hover:ring-2 group-hover:ring-indigo-500 transition-all" 
                      alt={m.name}
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-white font-medium group-hover:text-indigo-400 transition-colors">{m.name}</p>
                      <p className="text-gray-500 text-xs">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onChatClick?.({ id: m.id, name: m.name, avatar: m.avatar });
                      }}
                      className="p-2 hover:bg-white/5 rounded-lg text-gray-500 hover:text-indigo-400 transition-all"
                      title="Chat"
                    >
                      <MessageSquare size={18} />
                    </button>
                    <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300">
                      <Plus size={14} className="text-indigo-500" /> Add
                    </button>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300">Add</button>
                    <button className="bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-gray-300 flex items-center gap-2">
                      USD <ChevronDown size={14} />
                    </button>
                  </div>
                </td>
                <td className="p-4 text-gray-400">{m.role}</td>
                <td className="p-4 text-gray-400">{m.project}</td>
                <td className="p-4">
                  <button className="border border-dashed border-white/20 rounded-lg px-3 py-1.5 text-xs text-gray-500 hover:border-white/40 transition-all">
                    Add to team
                  </button>
                </td>
                <td className="p-4">
                  <div className="space-y-2">
                    <span className="bg-orange-400/10 text-orange-400 px-2 py-1 rounded text-[10px] font-bold uppercase">{m.title}</span>
                    <button className="block border border-dashed border-white/20 rounded-lg px-3 py-1.5 text-[10px] text-gray-500 hover:border-white/40 transition-all">
                      Give new title
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// --- Teams & Titles Shared Layout ---

const DragDropListLayout = ({ title, items, onAddItem }: { title: string, items: any[], onAddItem: () => void }) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">{title}</h1>
          <HelpCircle size={18} className="text-gray-500 cursor-help" />
        </div>
        <div className="flex items-center gap-3">
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
            <HelpCircle size={14} /> How to use?
          </button>
          <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
            <button className="p-1.5 bg-white/10 rounded text-gray-300"><Maximize2 size={16} /></button>
            <button className="p-1.5 text-gray-500 hover:text-gray-300 flex items-center gap-1 text-xs">Full <ChevronDown size={12} /></button>
          </div>
          <button 
            onClick={onAddItem}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20 flex items-center gap-2"
          >
            <Plus size={18} /> Add new {title.toLowerCase().slice(0, -1)}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-250px)]">
        {/* Left Pane: List of Teams/Titles */}
        <div className="lg:col-span-8 space-y-4 overflow-y-auto pr-2">
          {items.map((item, i) => (
            <div key={i} className="bg-[#151619] border border-white/5 rounded-xl p-6">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                  <LayoutGrid size={18} className="text-gray-500" />
                  <h3 className="text-lg font-bold text-white">{item.name}</h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Users size={14} /> {item.membersCount || 0}
                  </div>
                  <button className="text-gray-500 hover:text-white"><MoreHorizontal size={18} /></button>
                </div>
              </div>
              <div className="border-2 border-dashed border-white/5 rounded-xl py-12 flex flex-col items-center justify-center text-center">
                <p className="text-gray-500 text-sm">Drag and drop your team members from the right</p>
              </div>
              <div className="mt-4">
                <input 
                  type="text" 
                  placeholder={`Write your ${title.toLowerCase().slice(0, -1)} name`}
                  className="w-full bg-transparent border-none text-gray-400 text-sm focus:ring-0 p-0"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Right Pane: Member List */}
        <div className="lg:col-span-4 bg-[#151619] border border-white/5 rounded-xl flex flex-col">
          <div className="p-4 border-b border-white/5">
            <div className="flex gap-4 mb-4">
              <button className="text-indigo-400 border-b-2 border-indigo-400 pb-2 text-sm font-bold">All members</button>
              <button className="text-gray-500 hover:text-gray-300 pb-2 text-sm font-bold">{title.slice(0, -1)}-free members</button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 transition-all"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-[10px] font-bold text-gray-500 uppercase mb-4">M</div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col items-center text-center gap-2 group cursor-grab active:cursor-grabbing">
              <img 
                src="https://picsum.photos/seed/muhammad/60/60" 
                className="w-12 h-12 rounded-xl object-cover" 
                alt="Muhammad Tayyab"
                referrerPolicy="no-referrer"
              />
              <div>
                <p className="text-white font-medium text-sm">Muhammad Tayyab</p>
                <p className="text-gray-500 text-[10px]">muhammadtayyab...</p>
                <p className="text-gray-400 text-[10px] mt-1">Financial Analyst</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Project Viewers View ---

const ProjectViewersView = () => {
  const [activeTab, setActiveTab] = useState('Active');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Project Viewers</h1>
          <HelpCircle size={18} className="text-gray-500 cursor-help" />
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20">
            Invite Project Viewer
          </button>
        </div>
      </div>

      <div className="flex gap-8 border-b border-white/5 mb-6">
        {['Active', 'Archive'].map((tab) => (
          <button 
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 text-sm font-bold transition-all ${
              activeTab === tab ? 'text-indigo-400 border-b-2 border-indigo-400' : 'text-gray-500 hover:text-gray-300'
            }`}
          >
            {tab}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-3 pb-4">
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
            <HelpCircle size={14} /> How to use?
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <FilterButton icon={Users} label="Project Viewers" />
        <FilterButton icon={Settings} label="Status" />
        <FilterButton icon={Briefcase} label="Projects" />
      </div>

      <div className="flex flex-col items-center justify-center py-32 text-center">
        <h3 className="text-xl font-bold text-gray-500">No Project Viewers</h3>
      </div>
    </div>
  );
};

// --- Customers View ---

const CustomersView = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end mb-6">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <HelpCircle size={18} className="text-gray-500 cursor-help" />
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/10 transition-all">
            Import Customers
          </button>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20"
          >
            Add Customer
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <FilterButton icon={Users} label="Customers" />
        <FilterButton icon={Briefcase} label="Projects" />
        <div className="ml-auto flex items-center gap-3">
          <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
            <HelpCircle size={14} /> How to use?
          </button>
        </div>
      </div>

      <div className="bg-[#151619] border border-white/5 rounded-xl p-12 flex flex-col items-center justify-center text-center relative overflow-hidden">
        {/* Background illustration placeholder */}
        <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
          <Users size={300} />
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4">Customers</h2>
        <p className="text-gray-400 max-w-md mb-8">
          Here you can add your information here to purposes only.
        </p>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-xl shadow-indigo-600/20"
        >
          Add Customer
        </button>
      </div>

      {/* Create Customer Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-[#1c1d21] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center">
                <h2 className="text-xl font-bold text-white">Create</h2>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Name*</label>
                  <input 
                    type="text" 
                    placeholder="Full name"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Email*</label>
                  <input 
                    type="email" 
                    placeholder="myname@example.com"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Address</label>
                  <input 
                    type="text" 
                    placeholder="Enter the address of the client"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Additional Info</label>
                  <textarea 
                    placeholder="Type here"
                    rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">Project</label>
                  <div className="relative">
                    <select className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-indigo-500 transition-all appearance-none">
                      <option value="">Select project</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white/[0.02] flex justify-end">
                <button 
                  onClick={() => setIsModalOpen(false)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2.5 rounded-lg font-bold transition-all shadow-lg shadow-indigo-600/20"
                >
                  Create
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- Main People Component ---

const People: React.FC<PeopleProps> = ({ view = 'people', onOpenInvite, searchQuery = '', onMemberClick, onChatClick }) => {
  if (view === 'members') return <MembersView onOpenInvite={onOpenInvite} onMemberClick={onMemberClick} onChatClick={onChatClick} />;
  
  if (view === 'teams') return (
    <DragDropListLayout 
      title="Teams" 
      items={[{ name: 'Financial Analysis and Planning', membersCount: 0 }]} 
      onAddItem={() => {}} 
    />
  );

  if (view === 'titles') return (
    <DragDropListLayout 
      title="Titles" 
      items={[{ name: 'Financial Analyst', membersCount: 0 }]} 
      onAddItem={() => {}} 
    />
  );

  if (view === 'project-viewers') return <ProjectViewersView />;
  if (view === 'customers') return <CustomersView />;

  // Default People/Members view
  return <MembersView onOpenInvite={onOpenInvite} onMemberClick={onMemberClick} onChatClick={onChatClick} />;
};

export default People;
