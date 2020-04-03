const express = require('express');
const { body } = require('express-validator');

const auth = require('../middlewares/auth');
const recipesController = require('../controllers/recipes.controller');

const router = express.Router();

router.get('/all', recipesController.getRecipes);
router.get('/:recipeId', recipesController.getRecipe);
router.post('/', auth, recipesController.createRecipe);
router.delete('/:recipeId', recipesController.deleteRecipe);

module.exports = router;
