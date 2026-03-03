import React from 'react';
import { 
  LayoutGrid, 
  FileText, 
  Clock, 
  Calendar, 
  Sparkles, 
  BarChart3, 
  Monitor, 
  TrendingUp, 
  Users, 
  Layers, 
  CheckSquare, 
  DollarSign, 
  CalendarX, 
  CalendarClock, 
  MessageCircle, 
  Wrench, 
  Puzzle, 
  ChevronDown, 
  Star,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { View } from '../types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
  onLogout: () => void;
}

interface SubItem {
  id: string;
  label: string;
  badge?: string;
}

interface NavItem {
  id: View;
  label: string;
  icon: any;
  hasDropdown?: boolean;
  hasStar?: boolean;
  badge?: string;
  subItems?: SubItem[];
}

interface NavSection {
  title?: string;
  items: NavItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onViewChange, onLogout }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const [expandedItems, setExpandedItems] = React.useState<string[]>(['timesheets', 'reports', 'manage']);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const sections: NavSection[] = [
    {
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
        { 
          id: 'timesheets', 
          label: 'Timesheets', 
          icon: FileText, 
          hasDropdown: true,
          subItems: [
            { id: 'view-edit-timesheet', label: 'View & Edit Timesheet' },
            { id: 'timesheet-approval', label: 'Timesheet Approval', badge: 'Plus' },
            { id: 'time-editor', label: 'Time Editor' },
            { id: 'time-edit-log', label: 'Time Edit Log', badge: 'Plus' },
          ]
        },
      ]
    },
    {
      title: 'ANALYZE',
      items: [
        { id: 'real-time', label: 'Real Time', icon: Clock },
        { id: 'calendar', label: 'Calendar', icon: Calendar },
        { id: 'webwork-ai', label: 'WebWork AI', icon: Sparkles, hasStar: true },
        { 
          id: 'reports', 
          label: 'Reports', 
          icon: BarChart3, 
          hasDropdown: true,
          subItems: [
            { id: 'tracked-hours', label: 'Tracked Hours' },
            { id: 'timeline', label: 'Timeline' },
            { id: 'attendance', label: 'Attendance' },
            { id: 'activity-level', label: 'Activity Level' },
            { id: 'activity-description', label: 'Activity Description' },
            { id: 'apps-websites-report', label: 'Apps & Websites' },
            { id: 'tasks-report', label: 'Tasks' },
            { id: 'breaks', label: 'Breaks' },
            { id: 'billable-hours', label: 'Billable Hours' },
            { id: 'project-budgeting', label: 'Project Budgeting' },
            { id: 'payroll-report', label: 'Payroll', badge: 'Plus' },
            { id: 'unified-reporting', label: 'Unified Reporting', badge: 'Plus' },
            { id: 'scheduled-reports', label: 'Scheduled Reports', badge: 'Plus' },
            { id: 'all-reports', label: 'All Reports' },
          ]
        },
        { 
          id: 'monitoring', 
          label: 'Monitoring', 
          icon: Monitor, 
          hasDropdown: true,
          subItems: [
            { id: 'screenshots', label: 'Screenshots' },
            { id: 'daily-activity', label: 'Daily Activity' },
            { id: 'unusual-activity', label: 'Unusual Activity', badge: 'Premium' },
            { id: 'smart-monitoring', label: 'Smart Monitoring', badge: 'Add-on' },
          ]
        },
        { 
          id: 'productivity', 
          label: 'Productivity', 
          icon: TrendingUp, 
          hasDropdown: true,
          subItems: [
            { id: 'productivity-insights', label: 'Productivity Insights' },
            { id: 'apps-websites-prod', label: 'Apps & Websites' },
            { id: 'work-life-balance', label: 'Work-Life Balance' },
            { id: 'burnout-risk', label: 'Burnout Risk', badge: 'Plus' },
          ]
        },
      ]
    },
    {
      title: 'MANAGE',
      items: [
        { 
          id: 'people', 
          label: 'People', 
          icon: Users, 
          hasDropdown: true,
          subItems: [
            { id: 'members', label: 'Members' },
            { id: 'teams', label: 'Teams' },
            { id: 'titles', label: 'Titles' },
            { id: 'project-viewers', label: 'Project Viewers' },
            { id: 'customers', label: 'Customers' },
          ]
        },
        { 
          id: 'projects', 
          label: 'Projects', 
          icon: Layers, 
          hasDropdown: true,
          subItems: [
            { id: 'projects-list', label: 'Projects' },
            { id: 'project-groups', label: 'Project Groups' },
            { id: 'contracts', label: 'Contracts' },
          ]
        },
        { id: 'tasks', label: 'Tasks', icon: CheckSquare, hasDropdown: true },
        { 
          id: 'finances', 
          label: 'Finances', 
          icon: DollarSign, 
          hasDropdown: true,
          subItems: [
            { id: 'manage-payroll', label: 'Manage Payroll' },
            { id: 'payments', label: 'Payments', badge: 'Plus' },
            { id: 'invoices', label: 'Invoices' },
            { id: 'expense-tracking', label: 'Expense Tracking', badge: 'Plus' },
          ]
        },
        { 
          id: 'time-off', 
          label: 'Time Off', 
          icon: CalendarX, 
          hasDropdown: true,
          subItems: [
            { id: 'holidays', label: 'Holidays' },
            { id: 'leave', label: 'Leave' },
            { id: 'leave-balance', label: 'Leave Balance' },
          ]
        },
        { id: 'shifts', label: 'Shifts', icon: CalendarClock, badge: 'Plus' },
      ]
    },
    {
      title: 'OTHER',
      items: [
        { 
          id: 'communication', 
          label: 'Communication', 
          icon: MessageCircle, 
          hasDropdown: true,
          subItems: [
            { id: 'video-meetings', label: 'Video Meetings', badge: 'Plus' },
            { id: 'chat', label: 'Chat' },
          ]
        },
        { 
          id: 'tools', 
          label: 'Tools', 
          icon: Wrench, 
          hasDropdown: true,
          subItems: [
            { id: 'standups', label: 'Standups' },
            { id: 'announcements', label: 'Announcements' },
          ]
        },
        { id: 'integrations', label: 'Integrations', icon: Puzzle },
      ]
    }
  ];

  return (
    <aside className={cn(
      "fixed left-0 top-0 h-full bg-[#050510] text-white transition-all duration-300 z-50 flex flex-col border-r border-white/5",
      isOpen ? "w-64" : "w-20"
    )}>
      <div className="p-6 flex items-center justify-between">
        {isOpen && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-white">F</div>
            <span className="font-bold text-xl tracking-tight">FinTrack</span>
          </div>
        )}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors"
        >
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-4 py-2 space-y-6 overflow-y-auto scrollbar-hide">
        {sections.map((section, idx) => (
          <div key={idx} className="space-y-1">
            {isOpen && section.title && (
              <h3 className="px-3 text-[10px] font-bold text-gray-500 tracking-widest mb-2">
                {section.title}
              </h3>
            )}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const isExpanded = expandedItems.includes(item.id);
                return (
                  <div key={item.id} className="space-y-0.5">
                    <button
                      onClick={() => {
                        if (item.subItems && isOpen) {
                          toggleExpand(item.id);
                        } else {
                          onViewChange(item.id);
                        }
                      }}
                      className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group relative",
                        currentView === item.id 
                          ? "bg-emerald-500/10 text-emerald-500" 
                          : "text-gray-400 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      <item.icon size={20} className={cn(
                        "shrink-0",
                        currentView === item.id ? "text-emerald-500" : "group-hover:text-white"
                      )} />
                      {isOpen && (
                        <div className="flex-1 flex items-center justify-between min-w-0">
                          <span className="font-medium truncate">{item.label}</span>
                          <div className="flex items-center gap-2 shrink-0">
                            {item.hasStar && <Star size={14} className="text-gray-500" />}
                            {item.badge && (
                              <span className="bg-indigo-500/20 text-indigo-400 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase">
                                {item.badge}
                              </span>
                            )}
                            {item.hasDropdown && (
                              <ChevronDown 
                                size={14} 
                                className={cn(
                                  "text-gray-600 transition-transform",
                                  isExpanded && "rotate-180"
                                )} 
                              />
                            )}
                          </div>
                        </div>
                      )}
                      {currentView === item.id && (
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-emerald-500 rounded-r-full" />
                      )}
                    </button>
                    
                    {isOpen && isExpanded && item.subItems && (
                      <div className="ml-9 space-y-0.5 border-l border-white/5 pl-2">
                        {item.subItems.map((subItem) => (
                          <button
                            key={subItem.id}
                            onClick={() => onViewChange(subItem.id as View)}
                            className={cn(
                              "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all text-left",
                              currentView === subItem.id 
                                ? "text-emerald-500 bg-emerald-500/5" 
                                : "text-gray-400 hover:text-white hover:bg-white/5"
                            )}
                          >
                            <span className="truncate">{subItem.label}</span>
                            {subItem.badge && (
                              <span className="bg-indigo-500/20 text-indigo-400 text-[9px] font-bold px-1.5 py-0.5 rounded uppercase shrink-0">
                                {subItem.badge}
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-white/5">
        <button
          onClick={onLogout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-gray-400 hover:bg-red-500/10 hover:text-red-500 transition-all",
            !isOpen && "justify-center"
          )}
        >
          <LogOut size={20} />
          {isOpen && <span className="font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
