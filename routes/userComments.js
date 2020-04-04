//@author : SNEHA JAYAVARDHINI
const express=require('express');
const commentsController = require('../controllers/comments.controller');
const router =express.Router();
// inserts a new comment along with user id and recipe id
router.post('/comment',commentsController.postComment);

// to get all the comments

router.get('/allComments/:id',commentsController.getComments);

//to update the comment and likes count
router.put('/update',commentsController.updateComment);


// to delete the comment based on id
router.delete('/delete/:id',commentsController.deleteComment);

module.exports = router;