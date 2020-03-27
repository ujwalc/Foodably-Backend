const express = require('express')
const { body } = require('express-validator');
const advSearch = require('../models/search')
const router = express.Router()

router.get('/', async(req, res) => {
    try {

        const search1 = await advSearch.find().limit(10);
        res.json(search1);

    } catch (err) {
        res.json({ message: err });
    }

})

router.get('/:searchID', async(req, res) => {
    try {
        const searchID = req.params.searchID
        const search2 = await advSearch.find({
            $or: [
                { name: { $regex: searchID, $options: "i" } },
                { author: { $regex: searchID, $options: "i" } },
                { dishType: { $regex: searchID, $options: "i" } },
                { dietType: { $regex: searchID, $options: "i" } },
                { cuisine: { $regex: searchID, $options: "i" } },
                { category: { $regex: searchID, $options: "i" } },
                { ingridients: { $regex: searchID, $options: "i" } }
            ]
        });

        res.json(search2);

    } catch (err) {
        res.json({ message: err });
    }

})

router.get('/advSearch/:searchID', async(req, res) => {
    try {
        const searchID = req.params.searchID
        const data = req.body
        const keys = Object.keys(req.body)
        var ingridientsData = req.body.ingridients
        var dishTypeData = req.body.dishType
        let dietTypeData = req.body.dietType
        var cuisineData = req.body.cuisine

        if (ingridientsData[0]) {
            const search2 = await advSearch.find({
                $and: [{
                        $or: [
                            { name: { $regex: searchID, $options: "i" } },
                            { author: { $regex: searchID, $options: "i" } },
                            { dishType: { $regex: searchID, $options: "i" } },
                            { dietType: { $regex: searchID, $options: "i" } },
                            { cuisine: { $regex: searchID, $options: "i" } },
                            { category: { $regex: searchID, $options: "i" } },
                            { ingridients: { $regex: searchID, $options: "i" } }
                        ]

                    },
                    {
                        $and: [
                            { dishType: { $in: dishTypeData } },
                            { dietType: { $in: dietTypeData } },
                            { cuisine: { $in: cuisineData } },
                            { ingridients: { $in: ingridientsData } }
                        ]

                    }
                ]
            });
            res.json(search2);
        } else {
            const search2 = await advSearch.find({
                $and: [
                    { dishType: { $in: dishTypeData } },
                    { dietType: { $in: dietTypeData } },
                    { cuisine: { $in: cuisineData } }
                ]

            });
            res.json(search2);
        }

    } catch (err) {
        res.json({ message: err });
    }

})

router.get('/desc/:searchID/:sortID', async(req, res) => {
    try {
        const searchID = req.params.searchID
        const sortID = req.params.sortID
        const search2 = await advSearch.find({
            $or: [
                { name: { $regex: searchID, $options: "i" } },
                { author: { $regex: searchID, $options: "i" } },
                { dishType: { $regex: searchID, $options: "i" } },
                { dietType: { $regex: searchID, $options: "i" } },
                { cuisine: { $regex: searchID, $options: "i" } },
                { category: { $regex: searchID, $options: "i" } },
                { ingridients: { $regex: searchID, $options: "i" } }
            ]
        }).sort({
            [sortID]: -1
        });

        res.json(search2);

    } catch (err) {
        res.json({ message: err });
    }

})
router.get('/asc/:searchID/:sortID', async(req, res) => {
    try {
        const searchID = req.params.searchID
        const sortID = req.params.sortID
        const search2 = await advSearch.find({
            $or: [
                { name: { $regex: searchID, $options: "i" } },
                { author: { $regex: searchID, $options: "i" } },
                { dishType: { $regex: searchID, $options: "i" } },
                { dietType: { $regex: searchID, $options: "i" } },
                { cuisine: { $regex: searchID, $options: "i" } },
                { category: { $regex: searchID, $options: "i" } },
                { ingridients: { $regex: searchID, $options: "i" } }
            ]
        }).sort({
            [sortID]: 1
        });

        res.json(search2);

    } catch (err) {
        res.json({ message: err });
    }

})

router.post('/submit', async(req, res) => {
    try {
        const id = req.body.recipeId
        const name = req.body.name
        const author = req.body.author
        const description = req.body.description
        const ingridients = req.body.ingridients
        const ratings = req.body.ratings
        const category = req.body.category
        const likes = req.body.likes
        const preparationTime = req.body.preparationTime
        const createdAt = req.body.createdAt
        const cuisine = req.body.cuisine
        const dishType = req.body.dishType
        const dietType = req.body.dietType

        const test = {
            "recipeId": id,
            "name": name,
            "author": author,
            "description": description,
            "ingridients": ingridients,
            "ratings": ratings,
            "category": category,
            "likes": likes,
            "preparationTime": preparationTime,
            "createdAt": createdAt,
            "cuisine": cuisine,
            "dishType": dishType,
            "dietType": dietType
        }

        const search2 = await advSearch.insertMany(test)
        res.json(search2);

    } catch (err) {
        res.json({ message: err });
    }

})

module.exports = router