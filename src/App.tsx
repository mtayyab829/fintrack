import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { View, User } from './types';
import { Task } from './data';
import { api } from './api';
import { io, Socket } from 'socket.io-client';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  Search, 
  ChevronDown,
  Clock,
  TrendingUp,
  Users as UsersIcon,
  DollarSign,
  Calendar,
  Plus,
  X,
  LogOut,
  Settings as SettingsIcon
} from 'lucide-react';

// Views
import Dashboard from './views/Dashboard';
import Reports from './views/Reports';
import Activity from './views/Activity';
import TimeLogs from './views/TimeLogs';
import Projects from './views/Projects';
import People from './views/People';
import Payroll from './views/Payroll';
import Settings from './views/Settings';
import Tasks from './views/Tasks';
import Clients from './views/Clients';
import CalendarView from './views/Calendar';
import Timesheets from './views/Timesheets';
import RealTime from './views/RealTime';
import WebWorkAI from './views/WebWorkAI';
import Monitoring from './views/Monitoring';
import Productivity from './views/Productivity';
import TimeOff from './views/TimeOff';
import Shifts from './views/Shifts';
import Communication from './views/Communication';
import Tools from './views/Tools';
import Integrations from './views/Integrations';

// Modals
import InviteModal from './components/Modals/InviteModal';
import ManualTimeModal from './components/Modals/ManualTimeModal';
import ScreenshotModal from './components/Modals/ScreenshotModal';
import CreateProjectModal from './components/Modals/CreateProjectModal';
import GenerateInvoiceModal from './components/Modals/GenerateInvoiceModal';
import NotificationsDropdown from './components/NotificationsDropdown';

import { ToastProvider, useToast } from './components/Toast';

const AppContent: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const { showToast } = useToast();

  // Modal States
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isManualTimeModalOpen, setIsManualTimeModalOpen] = useState(false);
  const [isScreenshotModalOpen, setIsScreenshotModalOpen] = useState(false);
  const [isCreateProjectModalOpen, setIsCreateProjectModalOpen] = useState(false);
  const [isGenerateInvoiceModalOpen, setIsGenerateInvoiceModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string>('');
  const [selectedMember, setSelectedMember] = useState<{id: string, name: string, avatar?: string} | null>(null);
  const [selectedProject, setSelectedProject] = useState<{id: string, name: string} | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isTaskSelectorOpen, setIsTaskSelectorOpen] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.getMe().then(user => {
        setUser(user);
      }).catch(() => {
        api.logout();
        setUser(null);
      });
    }

    const newSocket = io();
    setSocket(newSocket);

    newSocket.on('task:created', (newTask: Task) => {
      setTasks(prev => [...prev, newTask]);
    });

    newSocket.on('task:updated', (updatedTask: Task) => {
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!user) return;
    const init = async () => {
      try {
        // Check if we need to seed
        const currentTasks = await api.getTasks();
        if (currentTasks.length === 0) {
          await api.seedDatabase();
          const seededTasks = await api.getTasks();
          setTasks(seededTasks);
        } else {
          setTasks(currentTasks);
        }
      } catch (err) {
        console.error("Failed to initialize data:", err);
      }
    };
    init();
  }, [user]);

  // Timer State
  const [isTracking, setIsTracking] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isTracking) {
      interval = setInterval(() => {
        setTimerSeconds(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTracking]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const openScreenshot = (url: string) => {
    setSelectedScreenshot(url);
    setIsScreenshotModalOpen(true);
  };

  const navigateToMemberProductivity = (member: {id: string, name: string, avatar?: string}) => {
    setSelectedMember(member);
    setCurrentView('productivity-insights');
  };

  const navigateToChat = (member: {id: string, name: string, avatar?: string}) => {
    setSelectedMember(member);
    setCurrentView('chat');
  };

  const navigateToProjectTasks = (project: {id: string, name: string}) => {
    setSelectedProject(project);
    setCurrentView('tasks');
  };

  const handleLogin = async (credentials: any) => {
    try {
      const { user } = await api.login(credentials);
      setUser(user);
      showToast('Welcome back!');
    } catch (err) {
      showToast('Login failed. Please check your credentials.', 'error');
      throw err;
    }
  };

  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      <Sidebar 
        currentView={currentView} 
        onViewChange={(view) => {
          setCurrentView(view);
          setSearchQuery(''); // Reset search on view change
        }} 
        onLogout={() => {
          api.logout();
          setUser(null);
          showToast('Logged out successfully', 'info');
        }} 
      />

      <main className="flex-1 ml-20 lg:ml-64 transition-all min-h-screen flex flex-col">
        {/* Header */}
        <header className="h-20 border-b border-white/5 flex items-center justify-between px-8 sticky top-0 bg-[#0a0a0a]/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-6 flex-1 max-w-2xl">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input 
                type="text" 
                placeholder="Search anything..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div className="h-8 w-px bg-white/5" />

            {/* Timer Widget */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/10 rounded-2xl px-4 py-2 relative">
              <div 
                className="flex flex-col cursor-pointer hover:opacity-80 transition-all"
                onClick={() => setIsTaskSelectorOpen(!isTaskSelectorOpen)}
              >
                <span className="text-[10px] text-gray-500 uppercase font-bold tracking-widest leading-none mb-1">
                  {selectedTask ? selectedTask.project : 'Select Task'}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-mono font-bold ${isTracking ? 'text-emerald-500' : 'text-gray-400'}`}>
                    {formatTime(timerSeconds)}
                  </span>
                  <ChevronDown size={12} className="text-gray-500" />
                </div>
                {selectedTask && (
                  <span className="text-[10px] text-indigo-400 truncate max-w-[120px]">{selectedTask.title}</span>
                )}
              </div>
              <button 
                onClick={() => {
                  if (!selectedTask && !isTracking) {
                    setIsTaskSelectorOpen(true);
                    showToast('Please select a task first', 'info');
                    return;
                  }
                  setIsTracking(!isTracking);
                  showToast(isTracking ? 'Time tracking stopped' : 'Time tracking started', isTracking ? 'info' : 'success');
                }}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all shadow-lg ${
                  isTracking 
                    ? 'bg-red-500 hover:bg-red-600 shadow-red-500/20' 
                    : 'bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20'
                }`}
              >
                {isTracking ? <X size={20} /> : <Clock size={20} />}
              </button>

              {/* Task Selector Dropdown */}
              <AnimatePresence>
                {isTaskSelectorOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full left-0 mt-2 w-72 bg-[#1c1d21] border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden"
                  >
                    <div className="p-4 border-b border-white/5">
                      <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Select Task</h4>
                    </div>
                    <div className="max-h-64 overflow-y-auto p-2">
                      {tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={() => {
                            setSelectedTask(task);
                            setIsTaskSelectorOpen(false);
                          }}
                          className={`w-full text-left p-3 rounded-xl transition-all hover:bg-white/5 flex flex-col gap-1 ${selectedTask?.id === task.id ? 'bg-indigo-500/10' : ''}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[10px] text-gray-500 font-mono">{task.taskId}</span>
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded uppercase ${
                              task.priority === 'High' ? 'bg-red-500/10 text-red-500' :
                              task.priority === 'Medium' ? 'bg-amber-500/10 text-amber-500' :
                              'bg-blue-500/10 text-blue-500'
                            }`}>
                              {task.priority}
                            </span>
                          </div>
                          <span className="text-xs text-white font-medium line-clamp-1">{task.title}</span>
                          <span className="text-[10px] text-gray-500">{task.project}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-gray-400 hover:text-white transition-colors"
              >
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-[#0a0a0a]" />
              </button>
              <NotificationsDropdown 
                isOpen={isNotificationsOpen} 
                onClose={() => setIsNotificationsOpen(false)} 
              />
            </div>
            
            <div className="h-8 w-px bg-white/5" />

            <div className="relative">
              <div 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-sm font-semibold text-white group-hover:text-emerald-500 transition-colors">{user.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                </div>
                <img 
                  src={user.avatar} 
                  alt={user.name}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10"
                  referrerPolicy="no-referrer"
                />
                <ChevronDown size={16} className={`text-gray-500 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
              </div>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-full right-0 mt-4 w-48 bg-[#151619] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50"
                  >
                    <div className="p-2">
                      <button 
                        onClick={() => { setCurrentView('settings'); setIsProfileOpen(false); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-white/5 rounded-xl transition-all"
                      >
                        <SettingsIcon size={16} />
                        Settings
                      </button>
                      <button 
                        onClick={() => { api.logout(); setUser(null); setIsProfileOpen(false); showToast('Logged out successfully', 'info'); }}
                        className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
            >
              {currentView === 'dashboard' && <Dashboard />}
              {currentView === 'activity' && <Activity onOpenScreenshot={openScreenshot} />}
              {currentView === 'time-logs' && <TimeLogs onOpenManualEntry={() => setIsManualTimeModalOpen(true)} searchQuery={searchQuery} />}
              {currentView === 'calendar' && <CalendarView />}
              {currentView === 'tasks' && (
                <Tasks 
                  selectedProject={selectedProject}
                  onProjectSelect={setSelectedProject}
                />
              )}
              {[
                'reports', 'tracked-hours', 'timeline', 'attendance', 'activity-level', 
                'activity-description', 'apps-websites-report', 'tasks-report', 'breaks', 
                'billable-hours', 'project-budgeting', 'payroll-report', 'unified-reporting', 
                'scheduled-reports', 'all-reports'
              ].includes(currentView) && <Reports view={currentView} onViewChange={setCurrentView} />}
              {currentView === 'projects' && (
                <Projects 
                  onOpenCreate={() => setIsCreateProjectModalOpen(true)} 
                  searchQuery={searchQuery} 
                  onProjectClick={navigateToProjectTasks}
                />
              )}
              {currentView === 'clients' && <Clients />}
              {['people', 'members', 'teams', 'titles', 'project-viewers', 'customers'].includes(currentView) && (
                <People 
                  view={currentView} 
                  onOpenInvite={() => setIsInviteModalOpen(true)} 
                  searchQuery={searchQuery} 
                  onMemberClick={navigateToMemberProductivity}
                  onChatClick={navigateToChat}
                />
              )}
              {['finances', 'manage-payroll', 'payroll-report'].includes(currentView) && <Payroll onOpenGenerateInvoice={() => setIsGenerateInvoiceModalOpen(true)} />}
              {currentView === 'settings' && <Settings />}
              {['timesheets', 'view-edit-timesheet', 'timesheet-approval', 'time-editor', 'time-edit-log'].includes(currentView) && <Timesheets view={currentView} />}
              {currentView === 'real-time' && <RealTime />}
              {currentView === 'webwork-ai' && <WebWorkAI />}
              {['monitoring', 'screenshots', 'daily-activity', 'unusual-activity', 'smart-monitoring'].includes(currentView) && <Monitoring view={currentView} />}
              {['productivity', 'productivity-insights', 'apps-websites-prod', 'work-life-balance', 'burnout-risk'].includes(currentView) && (
                <Productivity 
                  view={currentView} 
                  selectedMember={selectedMember}
                  onMemberSelect={setSelectedMember}
                />
              )}
              {['time-off', 'holidays', 'leave', 'leave-balance'].includes(currentView) && <TimeOff view={currentView} />}
              {currentView === 'shifts' && <Shifts />}
              {['communication', 'video-meetings', 'chat'].includes(currentView) && <Communication view={currentView} />}
              {['tools', 'standups', 'announcements'].includes(currentView) && <Tools view={currentView} />}
              {currentView === 'integrations' && <Integrations />}

              {/* Catch-all for other sub-items that don't have a specific view yet */}
              {[
                'teams', 'titles', 'project-viewers', 'customers',
                'projects-list', 'project-groups', 'contracts',
                'payments', 'invoices', 'expense-tracking'
              ].includes(currentView) && (
                <div className="space-y-8">
                   <div className="flex justify-between items-end">
                    <div>
                      <h1 className="text-3xl font-bold text-white mb-1 capitalize">{currentView.replace(/-/g, ' ')}</h1>
                      <p className="text-gray-400">Detailed view for {currentView.replace(/-/g, ' ')} module.</p>
                    </div>
                    <button className="bg-emerald-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-emerald-500/20">
                      Export Data
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="bg-[#151619] border border-white/5 p-6 rounded-3xl animate-pulse">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl mb-4" />
                        <div className="h-4 bg-white/5 rounded w-1/2 mb-2" />
                        <div className="h-6 bg-white/5 rounded w-3/4" />
                      </div>
                    ))}
                  </div>

                  <div className="bg-[#151619] border border-white/5 rounded-[2rem] p-8 h-96 flex flex-col items-center justify-center text-center">
                    <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center mb-6">
                      <Search size={40} className="text-gray-600" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">No data found for this period</h3>
                    <p className="text-gray-500 max-w-md">We couldn't find any records for {currentView.replace(/-/g, ' ')} in the selected date range. Try adjusting your filters.</p>
                    <button className="mt-8 text-emerald-500 font-bold hover:underline">Clear all filters</button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Modals */}
      <InviteModal 
        isOpen={isInviteModalOpen} 
        onClose={() => {
          setIsInviteModalOpen(false);
          // showToast('Invitation sent successfully');
        }} 
        onSuccess={() => showToast('Invitation sent successfully')}
      />
      <ManualTimeModal 
        isOpen={isManualTimeModalOpen} 
        onClose={() => setIsManualTimeModalOpen(false)} 
        onSuccess={() => showToast('Time log added successfully')}
      />
      <ScreenshotModal 
        isOpen={isScreenshotModalOpen} 
        onClose={() => setIsScreenshotModalOpen(false)} 
        imageUrl={selectedScreenshot}
      />
      <CreateProjectModal 
        isOpen={isCreateProjectModalOpen} 
        onClose={() => setIsCreateProjectModalOpen(false)} 
        onSuccess={() => showToast('Project created successfully')}
      />
      <GenerateInvoiceModal 
        isOpen={isGenerateInvoiceModalOpen} 
        onClose={() => setIsGenerateInvoiceModalOpen(false)} 
        onSuccess={() => showToast('Invoice generated and sent')}
      />
    </div>
  );
};

const App: React.FC = () => (
  <ToastProvider>
    <AppContent />
  </ToastProvider>
);

export default App;
