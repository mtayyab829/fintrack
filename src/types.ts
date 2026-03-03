export type View = 
  | 'login' 
  | 'dashboard' 
  | 'timesheets' 
  | 'view-edit-timesheet'
  | 'timesheet-approval'
  | 'time-editor'
  | 'time-edit-log'
  | 'real-time' 
  | 'calendar' 
  | 'webwork-ai' 
  | 'reports' 
  | 'tracked-hours'
  | 'timeline'
  | 'attendance'
  | 'activity-level'
  | 'activity-description'
  | 'apps-websites-report'
  | 'tasks-report'
  | 'breaks'
  | 'billable-hours'
  | 'project-budgeting'
  | 'payroll-report'
  | 'unified-reporting'
  | 'scheduled-reports'
  | 'all-reports'
  | 'monitoring' 
  | 'screenshots'
  | 'daily-activity'
  | 'unusual-activity'
  | 'smart-monitoring'
  | 'productivity' 
  | 'productivity-insights'
  | 'apps-websites-prod'
  | 'work-life-balance'
  | 'burnout-risk'
  | 'people' 
  | 'members'
  | 'teams'
  | 'titles'
  | 'project-viewers'
  | 'customers'
  | 'projects' 
  | 'projects-list'
  | 'project-groups'
  | 'contracts'
  | 'tasks' 
  | 'finances' 
  | 'manage-payroll'
  | 'payments'
  | 'invoices'
  | 'expense-tracking'
  | 'time-off' 
  | 'holidays'
  | 'leave'
  | 'leave-balance'
  | 'shifts' 
  | 'communication' 
  | 'video-meetings'
  | 'chat'
  | 'tools' 
  | 'standups'
  | 'announcements'
  | 'integrations'
  | 'settings'
  | 'activity'
  | 'time-logs'
  | 'clients';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'employee';
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  status: 'In Progress' | 'Completed' | 'On Hold';
  members: number;
  hours: number;
  progress: number;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  department: string;
  status: 'Active' | 'Inactive';
  lastActive: string;
  avatar: string;
}

export interface TimeLog {
  id: string;
  user: string;
  project: string;
  task: string;
  date: string;
  duration: string;
  status: 'Approved' | 'Pending' | 'Rejected';
}
