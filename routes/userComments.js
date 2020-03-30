const express=require('express');
const mongoose=require('mongoose');
const router =express.Router();
const Comment = require('../models/userComments');

router.post('/comment', (req,res,next)=>{
    //var obj= new Date(year,month,day);
    //console.log(obj);
    const user=new Comment({
        comment: req.body.comment,
        userId: req.body.userId,
        userName: req.body.userName,
        recipeId:req.body.recipeId
    });
    console.log(req.body);

    user.save().then(result=>{
        res.status(201).json({
            message: result
        });
    })
    .catch(err=>console.log(err));
});

router.get('/allComments',(req,res,next)=>{
    Comment.find()
    .exec()
    .then(data=>{
        console.log(data);
        res.status(200).json(data);
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

router.put('/update',(req,res,next)=>{
    
    var id= req.body.id;   
    Comment.updateOne({_id:mongoose.Types.ObjectId(id)},{$set: {comment:req.body.comment}})
    .then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:"Comment updated"
    });
});

router.delete('/delete/:id',(req,res,next)=>{
    var id= req.params.id;
    console.log(mongoose.Types.ObjectId(id));   
    Comment.deleteOne({_id:mongoose.Types.ObjectId(id)})
    .then(result=>{
        res.status(201).json({
            message:"Comment deleted"
        });
    })
    .catch(err=>console.log(err));
});

module.exports = router;