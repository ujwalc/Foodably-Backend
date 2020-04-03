//author: Raviteja Kase
//ID: B00823644
const userSchema = require('../models/user');
const utils = require('../utils/error.handling');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const passwordResetToken = require('../models/resettoken');



//Get all registered users
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

//Get User by ID
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

//Update User by passing Id and the request body

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

//Delete a user by Id

exports.deleteUser = (req, res, next) => {
    userSchema
        .deleteOne({ _id: req.params.id })
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

//Reset password functionality where a mail is generated with the reset link to the requested mail of the user
exports.ResetPassword = (req, res) => {
    if (!req.body.email) {
        return res
            .status(500)
            .json({ message: 'Email is required' });
    }
    let reqUser;
    const user = userSchema.findOne({
        email: req.body.email
    }).then(
        res1 => {
            reqUser = res1;
            console.log(reqUser);
            var resettoken = new passwordResetToken({ _userId: reqUser._id, resettoken: crypto.randomBytes(16).toString('hex') });
            resettoken.save(function(err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                passwordResetToken.find({ _userId: user._id, resettoken: { $ne: resettoken.resettoken } }).remove().exec();
                res.status(200).json({ message: 'Reset Password successfully.' });
                var transporter = nodemailer.createTransport({
                    service: "hotmail",
                    auth: {
                        user: "csci5709_group2@hotmail.com",
                        pass: "implementors2"
                    }
                });
                console.log(reqUser.email)
                var mailOptions = {
                    to: reqUser.email,
                    from: 'csci5709_group2@hotmail.com',
                    subject: 'Foodably Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                        'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                        'http://localhost:4200/response-reset-password/' + resettoken.resettoken + '\n\n' +
                        'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                }
                transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                        return console.log(err);
                    }

                    console.log('Message sent: ' + info.response);
                })
            })
        }

    );

    if (!user) {
        return res
            .status(409)
            .json({ message: 'Email does not exist' });
    }


}


//A password token is generated for each user request reset password and this will be genereted to the specific user 
exports.ValidPasswordToken = (req, res) => {
    if (!req.body.resettoken) {
        return res
            .status(500)
            .json({ message: 'Token is required' });
    }
    const user = passwordResetToken.findOne({
        resettoken: req.body.resettoken
    }).then(res1 => {
        userSchema.findOneAndUpdate({ _id: res1._userId }, { useFindAndModify: false }).then(() => {
            res.status(200).json({ message: 'Token verified successfully.' });
        }).catch((err) => {
            return res.status(500).send({ msg: err.message });
        });
    });
    if (!user) {
        return res
            .status(409)
            .json({ message: 'Invalid URL' });
    }

}


//Set the new password for resetting
exports.NewPassword = (req, res) => {
    passwordResetToken.findOne({ resettoken: req.body.resettoken }, function(err, userToken, next) {
        if (!userToken) {
            return res
                .status(409)
                .json({ message: 'Token has expired' });
        }

        userSchema.findOne({
            _id: userToken._userId
        }, function(err, userEmail, next) {
            if (!userEmail) {
                return res
                    .status(409)
                    .json({ message: 'User does not exist' });
            }
            return bcrypt.hash(req.body.newPassword, 10, (err, hash) => {
                if (err) {
                    return res
                        .status(400)
                        .json({ message: 'Error hashing password' });
                }
                userEmail.password = hash;
                userEmail.save(function(err) {
                    if (err) {
                        return res
                            .status(400)
                            .json({ message: 'Password can not reset.' });
                    } else {
                        userToken.remove();
                        return res
                            .status(201)
                            .json({ message: 'Password reset successfully' });
                    }

                });
            });
        });

    })
}


//Update the Bio of the user 
exports.UpdateBio = (req, res) => {

    userSchema
        .findOneAndUpdate({ _id: req.params.id }, { $set: { bio: req.params.bio } }, { useFindAndModify: false }).then(res1 => {
            console.log('User successfully updated!');
            res.status(200).json(res1);
        }).catch(err => {
            utils.handleError(err);
            next(err);
        });
}
exports.subscribersList = (req, res, next) => {
    userSchema.findById(req.params.id).then(
        user => {
            for (var i = 0; i < user.subscribers.length; i++) {
                console.log(user.subscribers[i]);
            }
            res.status(200).send(user.subscribers);
        }
    )
}