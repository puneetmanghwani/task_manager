const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');


// get all users
router.get('/', userController.getAllUsers);

// add a new user
router.post('/', userController.addUser);

// get a particular user based on user id
router.get('/:userId', userController.getUser);

// update a particular user based on user id
router.put('/:userId', userController.editUser);

// delete a particular user based on user id
router.delete('/:userId', userController.deleteUser);

// assign a task to a user
router.post('/:userId/tasks/:taskId', userController.assignTaskToUser);

// delete a task assigned to a user
router.delete('/:userId/tasks/:taskId', userController.retractTaskFromUser);


module.exports = router;

