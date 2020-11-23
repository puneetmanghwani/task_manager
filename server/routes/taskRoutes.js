const path = require('path');

const express = require('express');

const router = express.Router();

const taskController = require('../controllers/task');



router.get('/', taskController.getAllTasks);

router.get('/:taskId', taskController.getTask);

router.post('/', taskController.addTask);

router.put('/:taskId', taskController.editTask);

router.delete('/:taskId', taskController.deleteTask);


module.exports = router;

