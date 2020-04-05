const CookingList = require('../models/cooking-list');
const utils = require('../utils/error.handling');

//This getUserShoppingList retreives users recent shopping list record

exports.getUserShoppingList = (req, res, next) => {
  CookingList.findOne({ user: req.userId }).sort({time: -1})
    .then(cookingList => {
      if (!cookingList) {
        const error = new Error('Could not find any shopping list items.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({
        data: cookingList
      });
    })
    .catch(err => {
      utils.handleError(err);
      next(err);
    });
};


// When user clicks on export ingredients a shopping list is created with time and userid

exports.createShoppingList = (req, res, next) => {
  const dateNow= new Date()
  const cookingList = new CookingList({
    user: req.params.userId,
    time: dateNow.toString(),
    shoppingList: req.body.shoppingList
  });
  cookingList
    .save()
    .then(result => {
      res.status(201).json({
        message: 'Shopping list created successfully!',
        data: result
      });
    })
    .catch(err => {
      utils.handleError(err);
      next(err);
    });
};
