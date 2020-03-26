const express = require('express');
const { body } = require('express-validator');

const recipesController = require('../controllers/recipes.controller');

const router = express.Router();

router.get('/recipe/:recipeId', recipesController.getRecipe);

module.exports = router;
