const express = require('express');
const router = express.Router();

const {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTaskCompletion,
} = require('../controllers/taskController');

router.route('/').get(getTasks).post(createTask)
router.route('/:taskId').put(updateTask).patch(toggleTaskCompletion).delete(deleteTask)


module.exports = router;
