const { StatusCodes } = require("http-status-codes");

const User = require("../models/User");
const Task = require("../models/Task");
const CustomError = require('../errors');


const getTasks = async (req, res) => {
  const tasks = await Task.find({ createdBy: req.user.id });

  if (!tasks) {
    throw new CustomError.NotFoundError(`Tasks not found`);
  }

  res.status(StatusCodes.OK).json({ tasks });
};

const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, createdBy: req.user.id });
  await task.save();

  res.status(StatusCodes.CREATED).json({ task })
};

const updateTask = async (req, res) => {
  const taskId = req.params.taskId;
  const { title, description, completed } = req.body;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new CustomError.NotFoundError(`Task not found`);
  }


  if (title) task.title = title;
  if (description) task.description = description;
  if (completed) task.completed = completed;

  await task.save();

  res.status(StatusCodes.OK).json({ task })
};

const deleteTask = async (req, res) => {
  const taskId = req.params.taskId;

  const task = await Task.findById(taskId);

  if (!task) {
    throw new CustomError.NotFoundError(`Task not found`);
  }

  await task.remove();

  res.status(StatusCodes.OK).json({ msg: 'Task deleted' });
};


const toggleTaskCompletion = async (req, res) => {
  const taskId = req.params.taskId;

  const task = await Task.findById(taskId);
  if (!task) {
    throw new CustomError.NotFoundError(`Task not found`);
  }

  task.completed = !task.completed;

  await task.save();
  res.status(StatusCodes.OK).json({ task })
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
};
