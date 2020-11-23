const path = require('path');

const express = require('express');

const router = express.Router();

const taskController = require('../controllers/task');


// get all tasks
router.get('/', taskController.getAllTasks);

// add a new task
router.post('/', taskController.addTask);

// get a particular task based on task id
router.get('/:taskId', taskController.getTask);

// update a particular task based on task id
router.put('/:taskId', taskController.editTask);

// delete a particular task based on task id
router.delete('/:taskId', taskController.deleteTask);


module.exports = router;

