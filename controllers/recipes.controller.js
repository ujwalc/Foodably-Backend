const { validationResult } = require('express-validator');

const Recipe = require('../models/recipe');
const utils = require('../utils/error.handling');

exports.getRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .populate({ path: 'author', select: 'name -_id' })
    .exec()
    .then(recipe => {
      if (!recipe) {
        const error = new Error('Could not find the recipe.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        data: recipe
      });
    })
    .catch(err => {
      utils.handleError(err);
      next(err);
    });
};

exports.createRecipe = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect');
    error.statusCode = 422;
    throw error;
  }

  const recipe = new Recipe({
    title: req.body.title,
    description: req.body.description,
    author: req.body.authorId,
    videoURL: req.body.videoURL,
    previewURL: req.body.previewURL,
    isVeg: req.body.isVeg,
    ingredients: req.body.ingredients,
    category: req.body.category,
    preparationTime: req.body.preparationTime,
    cuisine: req.body.cuisine,
    type: req.body.type,
    instruction: req.body.instruction
  });

  recipe
    .save()
    // .then(result => {
    //     return User.findById(req.userId);
    // })
    // .then(user => {
    //     creator = user;
    //     user.posts.push(post);
    //     return user.save();
    // })
    .then(result => {
      res.status(201).json({
        message: 'Recipe created successfully!',
        data: recipe
        // creator: { _id: creator._id, name: creator.name }
      });
    })
    .catch(err => {
      utils.handleError(err);
      next(err);
    });
};
