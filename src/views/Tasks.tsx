import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Settings, 
  HelpCircle, 
  BarChart3, 
  MoreHorizontal, 
  ChevronRight, 
  ChevronDown,
  Calendar,
  MessageSquare,
  UserPlus,
  LayoutGrid,
  List,
  Filter,
  Columns as ColumnsIcon,
  CheckSquare,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import CreateTaskModal from '../components/Modals/CreateTaskModal';
import { useToast } from '../components/Toast';

import { Task } from '../data';
import { api } from '../api';
import { useEffect } from 'react';

interface TasksProps {
  selectedProject?: { id: string, name: string } | null;
  onProjectSelect?: (project: { id: string, name: string } | null) => void;
}

const Tasks: React.FC<TasksProps> = ({ selectedProject, onProjectSelect }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'board'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const { showToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tasksData, projectsData] = await Promise.all([
          api.getTasks(),
          api.getProjects()
        ]);
        setTasks(tasksData);
        setProjects(projectsData);
      } catch (err) {
        console.error("Failed to fetch tasks/projects:", err);
      }
    };
    fetchData();
  }, []);

  const filteredTasks = tasks.filter(t => 
    (!selectedProject || t.project === selectedProject.name) &&
    (t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.taskId.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const PriorityIcon = ({ priority }: { priority: string }) => {
    if (priority === 'High') {
      return (
        <div className="flex flex-col items-center gap-0.5 text-red-500">
          <div className="flex gap-0.5">
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-current" />
            <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-current" />
          </div>
          <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-current" />
        </div>
      );
    }
    if (priority === 'Medium') {
      return (
        <div className="text-amber-500">
          <div className="w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[7px] border-b-current" />
        </div>
      );
    }
    return (
      <div className="flex flex-col items-center gap-0.5 text-blue-400">
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-current" />
        <div className="w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-current" />
      </div>
    );
  };

  return (
    <div className="flex h-full -m-8">
      {/* Left Sidebar: Projects */}
      <div className="w-64 border-r border-white/5 bg-[#0a0a0a] flex flex-col">
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Projects</h2>
            <div className="flex items-center gap-2">
              <button className="text-gray-500 hover:text-white"><Plus size={18} /></button>
              <button className="text-gray-500 hover:text-white"><LayoutGrid size={16} /></button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
            <input 
              type="text" 
              placeholder="Search for projects" 
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4">
          <div className="px-4 mb-2">
            <button 
              onClick={() => onProjectSelect?.(null)}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${!selectedProject ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-300 hover:bg-white/5'}`}
            >
              <span className="text-sm font-medium">All tasks</span>
              <span className="text-xs text-gray-500">{tasks.length}</span>
            </button>
          </div>
          <div className="px-4 space-y-1">
            {projects.map((p) => (
              <button 
                key={p.id}
                onClick={() => onProjectSelect?.({ id: p.id, name: p.name })}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${selectedProject?.id === p.id ? 'bg-indigo-500/10 text-indigo-400' : 'text-gray-400 hover:bg-white/5'}`}
              >
                <span className="text-sm font-medium truncate">{p.name}</span>
                <div className="flex items-center gap-1">
                  <span className="text-xs">{tasks.filter(t => t.project === p.name).length}</span>
                  <ChevronRight size={14} />
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content: Tasks */}
      <div className="flex-1 bg-[#0f0f0f] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-[#0f0f0f]">
          <h1 className="text-2xl font-bold text-white">Task</h1>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
                <Settings size={14} /> Settings
              </button>
              <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5">
                <HelpCircle size={14} /> How to use?
              </button>
              <button className="text-indigo-400 hover:text-indigo-300 text-xs flex items-center gap-1.5">
                Task Report
              </button>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20"
              >
                <Plus size={18} />
                Add a new task
              </button>
              <button className="text-gray-500 hover:text-white"><MoreHorizontal size={20} /></button>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="px-8 py-4 border-b border-white/5 flex items-center justify-between bg-[#0f0f0f]">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
              <input 
                type="text" 
                placeholder="Search for tasks" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border border-white/10 rounded-lg pl-9 pr-3 py-1.5 text-xs text-white focus:outline-none focus:border-indigo-500 transition-all w-48"
              />
            </div>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className="w-4 h-4 border border-white/20 rounded bg-white/5 group-hover:border-indigo-500 transition-all" />
              <span className="text-xs text-gray-400 group-hover:text-white transition-all">My Tasks</span>
            </label>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition-all">
              <Clock size={14} className="text-gray-500" /> Show
            </button>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition-all">
              <UserPlus size={14} className="text-gray-500" /> Assignees
            </button>
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition-all">
              <Filter size={14} className="text-gray-500" /> Subtasks
            </button>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-gray-300 hover:bg-white/10 transition-all">
              Columns <ChevronDown size={14} />
            </button>
            <div className="flex bg-white/5 border border-white/10 rounded-lg p-1">
              <button 
                onClick={() => setViewMode('list')}
                className={`p-1 rounded transition-all ${viewMode === 'list' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <List size={16} />
              </button>
              <button 
                onClick={() => setViewMode('board')}
                className={`p-1 rounded transition-all ${viewMode === 'board' ? 'bg-white/10 text-white' : 'text-gray-500 hover:text-gray-300'}`}
              >
                <ColumnsIcon size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="flex-1 overflow-y-auto p-8 bg-[#0f0f0f]">
          <div className="space-y-8">
            {/* Status Group */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-indigo-500/20 text-indigo-400 px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider">OPEN</span>
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <div className="w-1 h-1 rounded-full bg-gray-500" />
                  {filteredTasks.length} tasks
                </div>
                <button className="text-gray-500 hover:text-white text-xs flex items-center gap-1.5 ml-2">
                  <Plus size={14} /> Add Task
                </button>
                
                {/* Table Headers */}
                <div className="flex-1 grid grid-cols-6 gap-4 ml-12 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                  <div>Task Id</div>
                  <div>Due Date</div>
                  <div>Priority</div>
                  <div>Comments</div>
                  <div>Status</div>
                  <div>Assignee</div>
                </div>
              </div>

              <div className="space-y-4">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="group flex items-center bg-[#151619] border border-white/5 rounded-xl p-4 hover:border-white/10 transition-all cursor-pointer">
                    <div className="w-1/3 pr-8">
                      <h4 className="text-sm font-medium text-white group-hover:text-indigo-400 transition-colors leading-relaxed">
                        {task.title}
                      </h4>
                    </div>
                    <div className="flex-1 grid grid-cols-6 gap-4 items-center">
                      <div className="text-xs text-gray-500 font-mono">{task.taskId}</div>
                      <div className="flex justify-start">
                        <Calendar size={18} className="text-gray-700 hover:text-gray-400 transition-colors" />
                      </div>
                      <div className="flex justify-start">
                        <PriorityIcon priority={task.priority} />
                      </div>
                      <div className="flex justify-start">
                        <MessageSquare size={18} className="text-gray-700 hover:text-gray-400 transition-colors" />
                      </div>
                      <div>
                        <span className="bg-indigo-500/10 text-indigo-400 px-3 py-1 rounded text-[10px] font-bold uppercase">
                          {task.status}
                        </span>
                      </div>
                      <div className="flex justify-start">
                        <div className="w-8 h-8 rounded-full border border-dashed border-white/10 flex items-center justify-center text-gray-600 hover:border-white/20 transition-all">
                          <UserPlus size={14} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <CreateTaskModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSuccess={(msg) => showToast(msg, 'success')}
      />
    </div>
  );
};

export default Tasks;
