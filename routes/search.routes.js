//Author: Ujwal Vikas Chanda, uj225642@dal.ca
const express = require('express')
const { body } = require('express-validator');
const advSearch = require('../models/search')
const Recipe = require('../models/recipe') //Recipe schema model
const User = require('../models/user') // user schema
const router = express.Router()
const nodemailer = require('nodemailer'); // Library for mailing
// Mailing credentials
let transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false, // upgrade later with STARTTLS
    auth: {
        user: "a3fe65ed8fae11",
        pass: "0e437e2d32cf7f"
    }
});


//Support Form 
router.get('/contact/:name/:mail/:body', async(req, res) => {
    try {

        const name = req.params.name
        const mail = req.params.mail
        const body = req.params.body

        var mailOptions = {
            from: mail,
            to: 'foodably.support@mail.com',
            subject: name,
            text: body
        };

        transport.sendMail(mailOptions, function(error, success) {
            if (error) {
                console.log(error);
            } else {
                console.log("Server is ready to take our messages");
            }
        });

    } catch (err) {
        res.json({ message: err });
    }

})

// Get all recipes
router.get('/', async(req, res) => {
    try {

        const search1 = await Recipe.find().limit(10);
        res.json(search1);

    } catch (err) {
        res.json({ message: err });
    }

})

// Get author name with specific keyword
router.get('/author/:searchID', async(req, res) => {
    try {
        const searchID = req.params.searchID

        const search1 = await User.find({ _id: searchID }).limit(10);
        res.json(search1);

    } catch (err) {
        res.json({ message: err });
    }

})

// Get all recipes with specific keyword
router.get('/:searchID', async(req, res) => {
    try {
        const searchID = req.params.searchID

        const search2 = await Recipe.find({
            $or: [
                { title: { $regex: searchID, $options: "i" } },
                { "author.name": { $regex: searchID, $options: "i" } },
                { type: { $regex: searchID, $options: "i" } },
                { description: { $regex: searchID, $options: "i" } },
                { cuisine: { $regex: searchID, $options: "i" } },
                { category: { $regex: searchID, $options: "i" } },
                {
                    ingredients: {

                        $elemMatch: { name: { $regex: searchID, $options: "i" } }


                    }
                }
            ]
        });

        res.json(search2);

    } catch (err) {
        res.json({ message: err });
    }

})

// Search with advance filters
router.post('/advSearch/:searchID', async(req, res) => {
    try {
        const searchID = req.params.searchID

        const data = req.body
        const keys = Object.keys(req.body)
        var ingridientsData = req.body.ingredients
        var dishTypeData = req.body.type
        let dietTypeData = req.body.isVeg
        var cuisineData = req.body.cuisine
        console.log(searchID)
        console.log(ingridientsData)
        console.log(dishTypeData)
        console.log(dietTypeData)
        console.log(cuisineData)
        if (ingridientsData[0]) {
            const search2 = await Recipe.find({
                $and: [{
                        $or: [
                            { title: { $regex: searchID, $options: "i" } },
                            { "author.name": { $regex: searchID, $options: "i" } },
                            { type: { $regex: searchID, $options: "i" } },
                            { description: { $regex: searchID, $options: "i" } },
                            { cuisine: { $regex: searchID, $options: "i" } },
                            { category: { $regex: searchID, $options: "i" } },
                            {
                                ingredients: {

                                    $elemMatch: { name: { $regex: searchID, $options: "i" } }


                                }
                            }
                        ]

                    },
                    {
                        $and: [
                            { type: { $in: dishTypeData } },
                            { isVeg: { $in: dietTypeData } },
                            { cuisine: { $in: { $regex: cuisineData, $options: "i" } } },
                            {
                                ingredients: {

                                    $elemMatch: { name: { $in: ingridientsData } }


                                }
                            }
                        ]

                    }
                ]
            });
            res.json(search2);
        } else {
            const search2 = await Recipe.find({
                $and: [{
                        $or: [
                            { title: { $regex: searchID, $options: "i" } },
                            { "author.name": { $regex: searchID, $options: "i" } },
                            { type: { $regex: searchID, $options: "i" } },
                            { description: { $regex: searchID, $options: "i" } },
                            { cuisine: { $regex: searchID, $options: "i" } },
                            { category: { $regex: searchID, $options: "i" } },
                            {
                                ingredients: {

                                    $elemMatch: { name: { $regex: searchID, $options: "i" } }


                                }
                            }
                        ]
                    },
                    {
                        $and: [
                            { type: { $in: dishTypeData } },
                            { isVeg: { $in: dietTypeData } },
                            { cuisine: { $in: cuisineData } }
                        ]

                    }
                ]
            });
            res.json(search2);
        }

    } catch (err) {
        res.json({ message: err });
    }

})

// getting results in sorted order
router.get('/desc/:searchID/:sortID', async(req, res) => {
    try {
        const searchID = req.params.searchID
        const sortID = req.params.sortID
        const search2 = await Recipe.find({
            $or: [
                { title: { $regex: searchID, $options: "i" } },
                { "author.name": { $regex: searchID, $options: "i" } },
                { type: { $regex: searchID, $options: "i" } },
                { description: { $regex: searchID, $options: "i" } },
                { cuisine: { $regex: searchID, $options: "i" } },
                { category: { $regex: searchID, $options: "i" } },
                {
                    ingredients: {

                        $elemMatch: { name: { $regex: searchID, $options: "i" } }


                    }
                }
            ]
        }).sort({
            [sortID]: -1
        });

        res.json(search2);

    } catch (err) {
        res.json({ message: err });
    }

})

// getting result in descending order
router.get('/asc/:searchID/:sortID', async(req, res) => {
    try {
        const searchID = req.params.searchID
        const sortID = req.params.sortID
        const search2 = await Recipe.find({
            $or: [
                { title: { $regex: searchID, $options: "i" } },
                { "author.name": { $regex: searchID, $options: "i" } },
                { type: { $regex: searchID, $options: "i" } },
                { description: { $regex: searchID, $options: "i" } },
                { cuisine: { $regex: searchID, $options: "i" } },
                { category: { $regex: searchID, $options: "i" } },
                {
                    ingredients: {

                        $elemMatch: { name: { $regex: searchID, $options: "i" } }


                    }
                }
            ]
        }).sort({
            [sortID]: 1
        });

        res.json(search2);

    } catch (err) {
        res.json({ message: err });
    }

})

//posting recipe 
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
        const image = req.body.image

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
            "dietType": dietType,
            "image": image
        }

        const search2 = await advSearch.insertMany(test)
        res.json(search2);

    } catch (err) {
        res.json({ message: err });
    }

})

module.exports = router
