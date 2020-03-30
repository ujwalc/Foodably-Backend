const mongoose = require('mongoose');
const meanieMongoose = require('meanie-mongoose-to-json');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment:String,
    userId:String,
    userName:String,
    recipeId: String,
}, { timestamps: true });

commentSchema.plugin(meanieMongoose);

module.exports=mongoose.model("Comment", commentSchema)