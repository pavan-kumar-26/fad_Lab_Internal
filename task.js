// task.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("./middleware"); // Ensure correct path

const Task = require("./models/taskSchema"); // Assuming you have a model

// Apply middleware to all routes in this file
router.use(authMiddleware);


// POST /api/tasks → Create a new task
router.post('/', async (req, res) => {
  try {
    const { title, description, status, dueDate } = req.body;
    const task = new Task({
      title,
      description,
      status,
      dueDate,
      assignedTo: req.user.id,  // Associate the task with the logged in user
    });
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/tasks → Retrieve all tasks for the logged-in user
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET /api/tasks/:id → Retrieve a specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, assignedTo: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// PUT /api/tasks/:id → Update task details
router.put('/:id', async (req, res) => {
  try {
    const update = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, assignedTo: req.user.id },
      update,
      { new: true } // Return the updated document
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// DELETE /api/tasks/:id → Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, assignedTo: req.user.id });
    if (!task) {
      return res.status(404).json({ message: 'Task not found or unauthorized' });
    }
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;