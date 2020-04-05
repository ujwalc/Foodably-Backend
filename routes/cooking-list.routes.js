const express = require('express');
const cookingListController = require('../controllers/cooking-list.controller');
const auth = require('../middlewares/auth');
const CookingList = require('../models/cooking-list');

const router = express.Router();

//Post and Get request routes to create and fetch ingredients as shopping list

router.post('/:userId', cookingListController.createShoppingList);
router.get('/', auth, cookingListController.getUserShoppingList);



module.exports = router;
