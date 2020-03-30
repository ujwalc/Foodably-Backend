const express = require('express');
const { body } = require('express-validator');

const profileController = require('../controllers/profile.controller');

const router = express.Router();

router.get('/recipes/:userId', profileController.getUserRecipies);

module.exports = router;
