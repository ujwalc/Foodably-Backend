const Comment = require('../models/userComments');
const mongoose=require('mongoose');

exports.postComment= (req,res,next)=>{
    const user=new Comment({
        comment: req.body.comment,
        user: req.body.userId,
        recipeId:req.body.recipeId,
        like:req.body.like
    });
    // console.log(req.body);

    user.save().then(result=>{
        res.status(201).json({
            message: result
        });
    })
    .catch(err=>console.log(err));
};

exports.getComments= (req,res,next)=>{
    var id= req.params.id;
    Comment.find({recipeId:id})
    .populate({path : 'user' , select: '+name -_id'})
    .exec()
    .then(data=>{
      //  console.log(data);
        res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
};

exports.updateComment=(req,res,next)=>{
    
    var id= req.body.id;   
    Comment.updateOne({_id:mongoose.Types.ObjectId(id)},{$set: {comment:req.body.comment, like: req.body.like}})
    .then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:"Comment updated"
    });
};

exports.deleteComment=(req,res,next)=>{
    var id= req.params.id;
    console.log(mongoose.Types.ObjectId(id));   
    Comment.deleteOne({_id:mongoose.Types.ObjectId(id)})
    .then(result=>{
        res.status(201).json({
            message:"Comment deleted"
        });
    })
    .catch(err=>console.log(err));
};