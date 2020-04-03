const express=require('express');
const ratingController = require('../controllers/rating.controller');
const router =express.Router();

router.post('/',ratingController.postRate);
router.get('/:id',ratingController.getRate);
router.put('/',ratingController.updateRate);

module.exports = router;