const { validationResult } = require('express-validator');

const Recipe = require('../models/recipe');
const utils = require('../utils/error.handling');

exports.getRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .then(recipe => {
      if (!recipe) {
        const error = new Error('Could not find the recipe.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        recipe: recipe
      });
    })
    .catch(err => {
      utils.handleError(err, next);
    });
};
