import express from "express";
import { createServer as createViteServer } from "vite";
import mongoose from "mongoose";
import { Server } from "socket.io";
import http from "http";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { TaskModel, ProjectModel, UserModel } from "./src/models.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const JWT_SECRET = process.env.JWT_SECRET || "fintrack-secret-key";

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'fintrack',
    allowed_formats: ['jpg', 'png', 'jpeg'],
  } as any,
});

const upload = multer({ storage: storage });

async function startServer() {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });
  const PORT = 3000;

  // MongoDB Connection
  let MONGODB_URI = process.env.MONGODB_URI || "";
  let isMockMode = false;
  
  // Basic validation and sanitization
  MONGODB_URI = MONGODB_URI.trim();
  
  // If empty or placeholder, use local fallback or skip
  const isPlaceholder = MONGODB_URI.includes("<username>") || MONGODB_URI.includes("<password>");
  const hasValidScheme = MONGODB_URI.startsWith("mongodb://") || MONGODB_URI.startsWith("mongodb+srv://");

  if (!MONGODB_URI || isPlaceholder || !hasValidScheme) {
    if (!MONGODB_URI) {
      console.log("MONGODB_URI is not set. Defaulting to local MongoDB...");
      MONGODB_URI = "mongodb://127.0.0.1:27017/fintrack";
    } else if (isPlaceholder) {
      console.warn("MONGODB_URI contains placeholders (<username> or <password>). Please update your environment variables.");
      MONGODB_URI = "mongodb://127.0.0.1:27017/fintrack";
    } else {
      console.error(`Invalid MONGODB_URI scheme: "${MONGODB_URI.substring(0, 15)}...". Must start with mongodb:// or mongodb+srv://`);
      MONGODB_URI = "mongodb://127.0.0.1:27017/fintrack";
    }
  }

  // Disable buffering so we don't hang if connection fails
  mongoose.set('bufferCommands', false);

  try {
    const maskedUri = MONGODB_URI.replace(/\/\/(.*):(.*)@/, "//***:***@");
    console.log(`Connecting to MongoDB at: ${maskedUri}`);
    await mongoose.connect(MONGODB_URI, { 
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000,
    });
    console.log("Connected to MongoDB successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    isMockMode = true;
    console.log("Running in 'Mock Mode' - API will return mock data for testing.");
    console.log("TIP: Ensure your MONGODB_URI is correctly set in the platform environment variables.");
  }

  // Mock Data Store (for Mock Mode)
  const mockStore = {
    users: [] as any[],
    tasks: [] as any[],
    projects: [] as any[]
  };

  app.use(cors());
  app.use(express.json());

  // Auth Middleware
  const authenticateToken = (req: any, res: any, next: any) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) return res.status(401).json({ error: "Access denied" });

    jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
      if (err) return res.status(403).json({ error: "Invalid token" });
      req.user = user;
      next();
    });
  };

  // Auth Routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      
      let user;
      if (isMockMode) {
        user = { _id: Date.now().toString(), name, email, password: hashedPassword, role: 'admin' };
        mockStore.users.push(user);
      } else {
        user = new UserModel({ name, email, password: hashedPassword });
        await user.save();
      }
      
      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(400).json({ error: "Registration failed" });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      
      let user;
      if (isMockMode) {
        // In mock mode, check mock store or allow default sarah
        user = mockStore.users.find(u => u.email === email);
        if (!user && email === "sarah@fintrack.com") {
          const hashedPassword = await bcrypt.hash("password123", 10);
          user = { _id: "mock-sarah", name: "Sarah Connor", email: "sarah@fintrack.com", password: hashedPassword, role: 'admin' };
          mockStore.users.push(user);
        }
      } else {
        user = await UserModel.findOne({ email });
      }

      if (!user) return res.status(400).json({ error: "User not found" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) return res.status(400).json({ error: "Invalid password" });

      const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
      res.json({ user, token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).json({ error: "Login failed. Check server logs." });
    }
  });

  app.get("/api/auth/me", authenticateToken, async (req: any, res) => {
    try {
      let user;
      if (isMockMode) {
        user = mockStore.users.find(u => u._id === req.user.id);
      } else {
        user = await UserModel.findById(req.user.id).select("-password");
      }
      res.json(user);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });

  // File Upload Route
  app.post("/api/upload", authenticateToken, upload.single('file'), (req: any, res) => {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });
    res.json({ url: req.file.path });
  });

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", database: mongoose.connection.readyState === 1 ? "connected" : "disconnected" });
  });

  // Tasks API
  app.get("/api/tasks", authenticateToken, async (req, res) => {
    try {
      let tasks;
      if (isMockMode) {
        tasks = mockStore.tasks;
      } else {
        tasks = await TaskModel.find().sort({ createdAt: -1 });
      }
      res.json(tasks);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tasks" });
    }
  });

  app.post("/api/tasks", authenticateToken, async (req, res) => {
    try {
      let task;
      if (isMockMode) {
        task = { ...req.body, _id: Date.now().toString(), createdAt: new Date() };
        mockStore.tasks.unshift(task);
      } else {
        task = new TaskModel(req.body);
        await task.save();
      }
      io.emit("task:created", task);
      res.status(201).json(task);
    } catch (err) {
      res.status(400).json({ error: "Failed to create task" });
    }
  });

  app.patch("/api/tasks/:id", authenticateToken, async (req, res) => {
    try {
      let task;
      if (isMockMode) {
        const index = mockStore.tasks.findIndex(t => t._id === req.params.id);
        if (index !== -1) {
          mockStore.tasks[index] = { ...mockStore.tasks[index], ...req.body };
          task = mockStore.tasks[index];
        }
      } else {
        task = await TaskModel.findByIdAndUpdate(req.params.id, req.body, { new: true });
      }
      
      if (!task) return res.status(404).json({ error: "Task not found" });
      
      io.emit("task:updated", task);
      res.json(task);
    } catch (err) {
      res.status(400).json({ error: "Failed to update task" });
    }
  });

  // Projects API
  app.get("/api/projects", authenticateToken, async (req, res) => {
    try {
      let projects;
      if (isMockMode) {
        projects = mockStore.projects;
      } else {
        projects = await ProjectModel.find();
      }
      res.json(projects);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.post("/api/projects", authenticateToken, async (req, res) => {
    try {
      let project;
      if (isMockMode) {
        project = { ...req.body, _id: Date.now().toString() };
        mockStore.projects.push(project);
      } else {
        project = new ProjectModel(req.body);
        await project.save();
      }
      res.status(201).json(project);
    } catch (err) {
      res.status(400).json({ error: "Failed to create project" });
    }
  });

  // Seed Data Route
  app.post("/api/seed", async (req, res) => {
    try {
      const mockTasks = [
        { taskId: 'GSWW-1', title: 'Invite your team members to your workspace', project: 'Getting Started with WebWork', priority: 'High', status: 'OPEN' },
        { taskId: 'GSWW-2', title: 'Create a new project and outline your tasks', project: 'Getting Started with WebWork', priority: 'Low', status: 'OPEN' },
        { taskId: 'GSWW-3', title: 'Assign team members to your projects', project: 'Getting Started with WebWork', priority: 'Medium', status: 'OPEN' },
        { taskId: 'GSWW-4', title: 'Verify team members have installed the software and started tracking time', project: 'Getting Started with WebWork', priority: 'Medium', status: 'OPEN' },
        { taskId: 'GSWW-5', title: 'Dive into time tracking reports and productivity insights', project: 'Getting Started with WebWork', priority: 'Medium', status: 'OPEN' },
        { taskId: 'FT-1', title: 'Setup MongoDB connection and schemas', project: 'FinTrack Mobile App', priority: 'High', status: 'DONE' },
        { taskId: 'FT-2', title: 'Implement JWT authentication', project: 'FinTrack Mobile App', priority: 'High', status: 'DONE' },
        { taskId: 'FT-3', title: 'Integrate Socket.io for real-time updates', project: 'FinTrack Mobile App', priority: 'Medium', status: 'IN PROGRESS' },
      ];

      const mockProjects = [
        { name: 'Getting Started with WebWork', description: 'Onboarding project' },
        { name: 'FinTrack Mobile App', description: 'Main mobile application' },
        { name: 'Enterprise Dashboard', description: 'Internal admin panel' },
      ];

      if (isMockMode) {
        mockStore.tasks = mockTasks.map(t => ({ ...t, _id: Math.random().toString(36).substr(2, 9), createdAt: new Date() }));
        mockStore.projects = mockProjects.map(p => ({ ...p, _id: Math.random().toString(36).substr(2, 9) }));
      } else {
        const taskCount = await TaskModel.countDocuments();
        const projectCount = await ProjectModel.countDocuments();
        
        if (taskCount === 0) await TaskModel.insertMany(mockTasks);
        if (projectCount === 0) await ProjectModel.insertMany(mockProjects);
      }

      res.json({ message: "Database seeded successfully" });
    } catch (err) {
      console.error("Seed error:", err);
      res.status(500).json({ error: "Failed to seed database" });
    }
  });

  // Socket.io connection
  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
