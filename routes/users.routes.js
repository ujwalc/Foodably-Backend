//author: Raviteja Kase
//ID: B00823644

const express = require('express');

const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/user-profile/:id', usersController.getUser);
router.put('/update-user/:id', usersController.updateUser);
router.delete('/delete-user/:id', usersController.deleteUser);
router.post('/req-reset-password', usersController.ResetPassword);
router.post('/new-password', usersController.NewPassword);
router.post('/valid-password-token', usersController.ValidPasswordToken);
router.put('/updateBio/:id/:bio', usersController.UpdateBio);
router.get('/sub/:id', usersController.subscribersList);

module.exports = router;
