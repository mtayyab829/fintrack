import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  taskId: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  project: { type: String, required: true },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  dueDate: { type: Date, default: null },
  assignee: { type: String, default: null },
  comments: { type: Number, default: 0 },
  status: { type: String, enum: ['OPEN', 'IN PROGRESS', 'REVIEW', 'DONE'], default: 'OPEN' },
}, { timestamps: true });

export const TaskModel = mongoose.model('Task', taskSchema);

const projectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  status: { type: String, default: 'Active' },
  members: [{ type: String }],
  budget: { type: Number, default: 0 },
  spent: { type: Number, default: 0 },
}, { timestamps: true });

export const ProjectModel = mongoose.model('Project', projectSchema);

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar: { type: String, default: 'https://picsum.photos/seed/user/200/200' },
  role: { type: String, default: 'Member' },
  project: { type: String, default: 'FinTrack Mobile App' },
  title: { type: String, default: 'Junior Developer' },
}, { timestamps: true });

export const UserModel = mongoose.model('User', userSchema);
