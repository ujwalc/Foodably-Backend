const mongoose = require('mongoose');
const meanieMongoose = require('meanie-mongoose-to-json');

const Schema = mongoose.Schema;

const ingredient = require('./ingredient');

const cookingSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  shoppingList: [ingredient]
});

cookingSchema.plugin(meanieMongoose);
module.exports = mongoose.model('cookingList', cookingSchema);
