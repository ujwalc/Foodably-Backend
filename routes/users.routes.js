const express = require('express');
const authorize = require('../middlewares/auth');

const usersController = require('../controllers/usersController');

const router = express.Router();

router.get('/', authorize, usersController.getUsers);
router.get('/user-profile/:id', usersController.getUser);
router.put('/update-user/:id', usersController.updateUser);
router.delete('/delete-user/:id', usersController.deleteUser);

module.exports = router;
