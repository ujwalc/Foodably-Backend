const express = require('express');
const { body } = require('express-validator');

const recipesController = require('../controllers/recipes.controller');

const router = express.Router();

router.get('/:recipeId', recipesController.getRecipe);
router.post('/', recipesController.createRecipe);
router.delete('/:recipeId', recipesController.deleteRecipe);

module.exports = router;