const mongoose = require('mongoose');
const ingredient = require('./ingredient');
const Schema = mongoose.Schema;

/* instruction step */

const instructionStepSchema = new Schema(
  {
    description: String,
    ingredients: [ingredient]
  },
  { _id: false }
);

module.exports = instructionStepSchema;
