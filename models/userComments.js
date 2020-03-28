const mongoose=require('mongoose');

const commentSchema=mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    comment:String,
    userId:String,
    userName:String,
    recipeId: String,
    commentDate: Date
  
});
module.exports=mongoose.model("userComment",commentSchema)