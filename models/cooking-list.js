const mongoose = require('mongoose');
const meanieMongoose = require('meanie-mongoose-to-json');

const Schema = mongoose.Schema;

const ingredient = require('./ingredient');
//Schema to add ingredients list as shopping list with cooking id's
const cookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  time: String,
  shoppingList: [ingredient]
});

cookingSchema.plugin(meanieMongoose);
module.exports = mongoose.model('cookingList', cookingSchema);
