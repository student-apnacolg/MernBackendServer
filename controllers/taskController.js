const Task = require('../models/taskModel')
const mongoose = require('mongoose')

// Get all Tasks
exports.getTasks = async(req, res) => {
  const tasks = await Task.find().sort({createdAt: -1})
  if (!tasks) {
    return res.status(400).json({
      error: "No Tasks Found"
    })
  }
  res.status(200).json(tasks)
}

// Get a single task by its ID
exports.getTask = async(req, res) => {
  const {id} = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Task"})
  }

  const task = await Task.findById(id);
  if (!task) {
    return res.status(400).json({
      error: "No such task"
    })
  }
  res.status(200).json(task)
}

// Create/Add a task
exports.createTask = async(req, res) => {
  const {title, description} = req.body;
  try {
    const task = await Task.create({title, description})
    res.status(200).json(task)
  } catch (error) {
    res.status(400).json({
      error: error.message
    })
  }
}

// Update a task by its ID
exports.updateTask = async(req, res, next) => {
  const {id} = req.params;
  if(!mongoose.Types.ObjectId.isValid(id)){
  return res.status(404).json({error: "No such Task"})
  }

 try {
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Toggle the boolean field directly
    task.completed = !task.completed;
    await task.save();  // Mongoose validators applied on save

    res.status(200).json(task);
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
};

// Delete a task by its ID
exports.deleteTask = async(req, res) => {
  const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({error: "No such Task"})
  }

  const task = await Task.findOneAndDelete({_id: id})
  if (!task) {
    return res.status(400).json({
      error: "No such task to delete"
    })
  }
  res.status(200).json({
    task,
    msg: "Task deleted successfully"
  })
}