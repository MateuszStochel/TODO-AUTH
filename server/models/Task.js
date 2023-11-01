const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a task title'],
    maxlength: 100,
  },
  description: {
    type: String,
    maxlength: 1000,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
}, { timestamps: true });

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;