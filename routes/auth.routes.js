const express = require('express');
const authorize = require('../middlewares/auth');
const { body, check } = require('express-validator');

const authController = require('../controllers/authController');
const usersController = require('../controllers/usersController');

const router = express.Router();

router.post(
    '/register-user', [
        check('name')
        .not()
        .isEmpty()
        .isLength({ min: 3 })
        .withMessage('Name must be atleast 3 characters long'),
        check('email', 'Email is required')
        .not()
        .isEmpty(),
        check('password', 'Password should be between 5 to 8 characters long')
        .not()
        .isEmpty()
        .isLength({ min: 5, max: 20 })
    ],
    authController.signup
);

router.post('/signin', authController.login);
router.get('/validateEmail/:email', authController.validateEmail);

router.get('/', usersController.getUsers);
router.get('/user-profile/:id', usersController.getUser);
router.put('/update-user/:id', usersController.updateUser);
router.delete('/delete-user/:id', usersController.deleteUser);

module.exports = router;