const express = require('express');

const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/user-profile/:id', usersController.getUser);
router.put('/update-user/:id', usersController.updateUser);
router.delete('/delete-user/:id', usersController.deleteUser);

module.exports = router;
