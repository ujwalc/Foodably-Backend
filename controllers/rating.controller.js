//@author : SNEHA JAYAVARDHINI
const Rating = require('../models/rating');
const mongoose = require('mongoose');

// posts the rating given by user
exports.postRate = (req, res, next) => {
  const user = new Rating({
    rate: req.body.rate,
    submissions: 1,
    userId: req.body.userId,
    recipeId: req.body.recipeId
  });

  console.log(req.body);

  user
    .save()
    .then(result => {
      res.status(201).json({
        message: result
      });
    })
    .catch(err => console.log(err));
};

//gets the star rating given by the user
exports.getRate = (req, res, next) => {
  var id = req.params.id;
  Rating.findById(id)
    .exec()
    .then(data => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};
//updates the star rating
exports.updateRate = (req, res, next) => {
  var id = req.body.id;
  Rating.updateOne(
    { _id: mongoose.Types.ObjectId(id) },
    { $set: { rate: req.body.rate } }
  )
    .then(result => {
      console.log(result);
    })
    .catch(err => console.log(err));
  res.status(201).json({
    message: 'Rating updated'
  });
};
