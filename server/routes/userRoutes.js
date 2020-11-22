const path = require('path');

const express = require('express');

const router = express.Router();

const userController = require('../controllers/user');

// router.get('/:userId', userController.login);

// router.get('/', userController.login);

router.post('/', userController.addUser);

router.put('/:userId', userController.editUser);

router.delete('/:userId', userController.deleteUser);


module.exports = router;

