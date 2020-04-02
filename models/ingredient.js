const mongoose = require('mongoose');
 const Schema = mongoose.Schema;

/* ingredient step */

const ingredientSchema = new Schema(
  {
    name: String,
    value: Number,
    units: String
  },
  { _id: false }
);

module.exports = ingredientSchema;
