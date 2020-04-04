const { validationResult } = require('express-validator');

const Recipe = require('../models/recipe');
const utils = require('../utils/error.handling');
const userSchema = require('../models/user');
const ObjectId = require('mongodb').ObjectID;
const nodemailer = require('nodemailer');

exports.getRecipes = (req, res, next) => {
  Recipe.find({}, ['id', 'title', 'previewURL', 'preparationTime'])
    .populate({ path: 'author', select: 'name -_id' })
    .exec()
    .then((recipes) => {
      if (!recipes) {
        const error = new Error('Could not find any recipes.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        data: recipes,
      });
    })
    .catch((err) => {
      utils.handleError(err);
      next(err);
    });
};

exports.getRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  Recipe.findById(recipeId)
    .populate({ path: 'author', select: 'name  id' })
    .exec()
    .then((recipe) => {
      if (!recipe) {
        const error = new Error('Could not find the recipe.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        data: recipe,
      });
    })
    .catch((err) => {
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
    author: req.userId,
    videoURL: req.body.videoURL,
    previewURL: req.body.previewURL,
    isVeg: req.body.isVeg,
    ingredients: req.body.ingredients,
    category: req.body.category,
    preparationTime: req.body.preparationTime,
    cuisine: req.body.cuisine,
    type: req.body.type,
    instruction: req.body.instruction,
  });

  recipe
    .save()
    .then((result) => {
      console.log(result);
      console.log(req.body.authorId);
      userSchema.findById(req.body.authorId).then((user) => {
        let name = user.name;
        let subsribers = user.subscribers;
        console.log(subsribers);

        var transporter = nodemailer.createTransport({
          service: 'hotmail',
          auth: {
            user: 'csci5709_group2@hotmail.com',
            pass: 'implementors2',
          },
        });

        var mailOptions = {
          to: [],
          bcc: user.subscribers,
          from: 'csci5709_group2@hotmail.com',
          subject: 'Foodably New Recipe Posted by ' + name,
          text:
            'A new wonderful Recipe ' +
            req.body.title +
            ' has been  psodted by ' +
            name +
            ' .\n\n' +
            'Please visit Foodably to know about the beautiful recipe posted by your favourite chef \n\n',
        };
        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            return console.log(err);
          }
          console.log('Message sent: ' + info.response);
        });
      });
      res.status(201).json({
        message: 'Recipe created successfully!',
        data: recipe,
      });
    })
    .catch((err) => {
      utils.handleError(err);
      next(err);
    });
};

exports.deleteRecipe = (req, res, next) => {
  const recipeId = req.params.recipeId;
  console.log(recipeId);

  Recipe.findByIdAndRemove(recipeId)
    .then((result) => {
      console.log(result);
      res.status(200).json({
        message: 'Recipe deleted',
      });
    })
    .catch((err) => {
      utils.handleError(err);
      next(err);
    });
};

exports.subscribeRecipe = (req, res, next) => {
  const subscriberId = req.params.subscriberId;
  const subscriberdTo = req.params.subscriberdTo;
  userSchema
    .findById(subscriberId)
    .then((user) => {
      let email = user.email;
      userSchema.updateOne(
        { _id: ObjectId(subscriberdTo) },
        {
          $push: {
            subscribers: email,
          },
        },
        (error, result1) => {
          if (error) {
            return response.status(500).send(error);
          }
          res.send(result1);
        }
      );
    })
    .catch((err) => {
      utils.handleError(err);
      next(err);
    });
};

exports.unsubsctibe = (req, res, next) => {
  const subscriberId = req.params.subscriberId;
  const subscriberdTo = req.params.subscriberdTo;
  userSchema
    .findById(subscriberId)
    .then((user) => {
      let email = user.email;
      userSchema.updateOne(
        { _id: ObjectId(subscriberdTo) },
        {
          $pull: {
            subscribers: email,
          },
        },
        (error, result1) => {
          if (error) {
            return response.status(500).send(error);
          }
          res.send(result1);
        }
      );
    })
    .catch((err) => {
      utils.handleError(err);
      next(err);
    });
};
