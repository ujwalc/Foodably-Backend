const express=require('express');
const mongoose=require('mongoose');
const router =express.Router();

const UserModel=require('../models/userComments');


router.post('/comment',(req,res,next)=>{
    //var obj= new Date(year,month,day);
    //console.log(obj);
    const user=new UserModel({
        _id:new mongoose.Types.ObjectId(),
        comment: req.body.comment,
        userId: req.body.userId,
        userName: req.body.userName,
        recipeId:req.body.recipeId,
        commentDate: req.body.commentDate
    });
    user.save().then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:"Comment added to database"
    });
});

router.get('/allComments',(req,res,next)=>{
    UserModel.find()
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
    console.log(req.body.comment);
    console.log(mongoose.Types.ObjectId(id));   
    UserModel.updateOne({_id:mongoose.Types.ObjectId(id)},{$set: {comment:req.body.comment}})
    .then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:"Comment updated"
    });
});

router.delete('/delete',(req,res,next)=>{
    var id= req.body.id;
    console.log(mongoose.Types.ObjectId(id));   
    UserModel.deleteOne({_id:mongoose.Types.ObjectId(id)})
    .then(result=>{
        console.log(result);
    })
    .catch(err=>console.log(err));
    res.status(201).json({
        message:"Comment deleted"
    });
});

module.exports = router;