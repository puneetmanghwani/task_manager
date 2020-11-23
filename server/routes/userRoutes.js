const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

// router.get('/:userId', userController.login);

router.get('/', userController.getAllUsers);

router.post('/', userController.addUser);

router.get('/:userId', userController.getUser);

router.put('/:userId', userController.editUser);

router.delete('/:userId', userController.deleteUser);

// router.get('/tasks', userController.getTasks);

router.post('/:userId/tasks/:taskId', userController.assignTaskToUser);

router.delete('/:userId/tasks/:taskId', userController.retractTaskFromUser);


module.exports = router;

