const User = require('../models/user');

exports.getUsers = (req, res, next) => {
  User.find()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getUser = (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.status(200).json(user);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateUser = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, { $set: req.body })
    .then(updatedUser => {
      console.log('User successfully updated!');
      res.status(200).json(updatedUser);
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.deleteUser = (req, res, next) => {
  User.findByIdAndRemove(req.params.id)
    .then(result => {
      console.log(result);
      res.status(200).json({
        msg: 'User is deleted successfully'
      });
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};
