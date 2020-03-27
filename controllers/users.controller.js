const userSchema = require('../models/user');
const utils = require('../utils/error.handling');

exports.getUsers = (req, res, next) => {
  userSchema
    .find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      utils.handleError(err);
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  userSchema
    .findById(req.params.id)
    .then(user => {
      res.status(200).json({
        msg: user
      });
    })
    .catch(err => {
      utils.handleError(err);
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  userSchema
    .findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(updatedUser => {
      console.log('User successfully updated!');
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      utils.handleError(err);
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  userSchema
    .findByIdAndRemove(req.params.id)
    .then(result => {
      console.log(result);
      res.status(200).json({
        msg: 'User is deleted successfully'
      });
    })
    .catch(err => {
      utils.handleError(err);
      next(err);
    });
};
