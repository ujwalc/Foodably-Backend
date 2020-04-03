const mongoose = require('mongoose');
const meanieMongoose = require('meanie-mongoose-to-json');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    comment:String,
    // userId:{
    //     type: Schema.Types.ObjectId,
    //     ref: 'User'
    // },
    user:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recipeId: {
        type: Schema.Types.ObjectId,
        ref: 'Recipe'
    },
    like: Number
}, { timestamps: true });

commentSchema.plugin(meanieMongoose);

module.exports=mongoose.model("Comment", commentSchema)