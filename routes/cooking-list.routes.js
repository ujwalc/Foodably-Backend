const express = require('express');
const cookingListController = require('../controllers/cooking-list.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/', auth, cookingListController.createShoppingList);
router.get('/', auth, cookingListController.getUserShoppingList);

module.exports = router;
