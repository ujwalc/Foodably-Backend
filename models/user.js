//author: Raviteja Kase
//ID: B00823644
const mongoose = require('mongoose');
const meanieMongoose = require('meanie-mongoose-to-json');

const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');

let userSchema = new Schema(
  {
    name: {
      type: String
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
    bio: {
        type: String
    },
    subscribers: {
        "type": [
            "String"
        ]
    }
  },
  {
    collection: 'users'
  }
);

// this replaces _id with id and removes _v variable
userSchema.plugin(meanieMongoose);
userSchema.plugin(uniqueValidator, { message: 'Email already in use.' });
module.exports = mongoose.model('User', userSchema);