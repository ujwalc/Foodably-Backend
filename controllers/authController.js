const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const { check, validationResult } = require('express-validator');

const userSchema = require('../models/user');

exports.signup = (req, res, next) => {
    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
        return res.status(422).jsonp(errors.array());
    } else {
        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new userSchema({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user
                .save()
                .then(response => {
                    res.status(201).json({
                        message: 'User successfully created!',
                        result: response
                    });
                })
                .catch(error => {
                    res.status(500).json({
                        error: error
                    });
                });
        });
    }
};

exports.login = (req, res, next) => {
    let getUser;

    userSchema.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            getUser = user;
            return bcrypt.compare(req.body.password, user.password);
        })
        .then(response => {
            if (!response) {
                return res.status(401).json({
                    message: 'Authentication failed'
                });
            }
            let jwtToken = jwt.sign({
                    email: getUser.email,
                    userId: getUser._id
                },
                'a4-secret', {
                    expiresIn: '1h'
                }
            );

            res.status(200).json({
                token: jwtToken,
                expiresIn: 3600,
                _id: getUser._id,
                name: getUser.name,
                email: getUser.email,
                msg: getUser
            });
        })
        .catch(err => {
            return res.status(401).json({
                message: 'Authentication failed'
            });
        });
};

exports.validateEmail = (req, res, next) => {
    const email = req.params.email;
    userSchema.find({ email: email }, (error, result) => {
        if (error) {
            return response.status(500).send(er);
        }
        console.log(result);
        res.send(result);
    });
};