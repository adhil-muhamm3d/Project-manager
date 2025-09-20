const express = require("express");
const app = express();
const PORT = 3000;

// Middleware to parse JSON from requests
app.use(express.json());

// Fake "database" (array for now)
let tasks = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build first API", completed: true },
];

// Root route
app.get("/", (req, res) => {
  res.send("Server is working!");
});

// New route: return some sample tasks
app.get("/tasks", (req, res) => {
  res.json(tasks);
});

// POST a new task
app.post("/tasks", (req, res) => {
  const newTask = {
    id: tasks.length + 1,
    title: req.body.title,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(t => t.id === taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  if (req.body.title !== undefined) {
    task.title = req.body.title;
  }
  if (req.body.completed !== undefined) {
    task.completed = req.body.completed;
  }

  res.json(task);
});

// DELETE a task
app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ message: "Task not found" });
  }

  // remove task from array
  const deletedTask = tasks.splice(taskIndex, 1);
  res.json({ message: "Task deleted", task: deletedTask[0] });
});