const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  },
  units: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
