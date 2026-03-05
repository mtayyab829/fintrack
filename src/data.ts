export interface Task {
  id: string;
  taskId: string;
  title: string;
  project: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: string | null;
  assignee: string | null;
  comments: number;
  status: 'OPEN' | 'IN PROGRESS' | 'REVIEW' | 'DONE';
}

export const initialTasks: Task[] = [
  { 
    id: '1', 
    taskId: 'GSWW-1', 
    title: 'Invite your team members to your workspace', 
    project: 'Getting Started with WebWork', 
    priority: 'High', 
    dueDate: null, 
    assignee: null, 
    comments: 0, 
    status: 'OPEN' 
  },
  { 
    id: '2', 
    taskId: 'GSWW-2', 
    title: 'Create a new project and outline your tasks', 
    project: 'Getting Started with WebWork', 
    priority: 'Low', 
    dueDate: null, 
    assignee: null, 
    comments: 0, 
    status: 'OPEN' 
  },
  { 
    id: '3', 
    taskId: 'GSWW-3', 
    title: 'Assign team members to your projects', 
    project: 'Getting Started with WebWork', 
    priority: 'Medium', 
    dueDate: null, 
    assignee: null, 
    comments: 0, 
    status: 'OPEN' 
  },
  { 
    id: '4', 
    taskId: 'GSWW-4', 
    title: 'Verify team members have installed the software and started tracking time', 
    project: 'Getting Started with WebWork', 
    priority: 'Medium', 
    dueDate: null, 
    assignee: null, 
    comments: 0, 
    status: 'OPEN' 
  },
  { 
    id: '5', 
    taskId: 'GSWW-5', 
    title: 'Dive into time tracking reports and productivity insights', 
    project: 'Getting Started with WebWork', 
    priority: 'Medium', 
    dueDate: null, 
    assignee: null, 
    comments: 0, 
    status: 'OPEN' 
  },
];
