const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recipeSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    author: {
      name: String
    },
    isVeg: Boolean,
    ingredients: [{ name: String, value: Number, units: String }],
    likes: Number,
    rating: { ratingTotal: Number, submissions: Number },
    category: String,
    preparationTime: String,
    cuisine: String,
    typeOfDish: String
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recipe', recipeSchema);
