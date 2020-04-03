const express = require('express');
const cookingListController = require('../controllers/cooking-list.controller');
const auth = require('../middlewares/auth');
const CookingList = require('../models/cooking-list');

const router = express.Router();

router.post('/:userId', cookingListController.createShoppingList);
router.get('/', auth, cookingListController.getUserShoppingList);
//  router.post('/:id', async(req, res) => {
//     try {
//         const searchID = req.params.id
//         console.log(searchID)
//        // res.json(search1);

//     } catch (err) {
//        // res.json({ message: err });
//     }

// })


module.exports = router;
