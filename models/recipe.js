const mongoose = require('mongoose');
const meanieMongoose = require('meanie-mongoose-to-json');
const Schema = mongoose.Schema;

const ranking = require('./ranking');
const ingredient = require('./ingredient');
const instructionStep = require('./instruction-step');

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
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    videoURL: String,
    previewURL: String,
    isVeg: {
      type: Boolean,
      default: false
    },
    ingredients: [ingredient],
    likes: {
      type: Number,
      default: 0
    },
    ranking: {
      type: ranking,
      default: new Schema()
    },
    category: String,
    // In minutes
    preparationTime: Number,
    cuisine: String,
    /* type of dish */
    type: String,
    instruction: [instructionStep]
  },
  { timestamps: true }
);

// this replaces _id with id and removes _v variable
recipeSchema.plugin(meanieMongoose);

module.exports = mongoose.model('Recipe', recipeSchema);