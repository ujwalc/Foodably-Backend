const express = require('express');
const { body } = require('express-validator');

const profileController = require('../controllers/profile.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.get('/recipes/:userId', auth, profileController.getUserRecipies);

module.exports = router;
