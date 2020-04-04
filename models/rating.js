//@author : SNEHA JAYAVARDHINI
const mongoose = require('mongoose');
const meanieMongoose = require('meanie-mongoose-to-json');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
     rate: Number,
     submissions: {
        type: Number,
        default: 0
      },
    userId:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
}, 
);

ratingSchema.plugin(meanieMongoose);
module.exports=mongoose.model("Rating", ratingSchema)