const express = require('express');
const cookingList = require('../models/cookingList')

const router = express.Router();


router.get('/', async(req,res) =>{
    const data = await cookingList.find()
    
    res.status(200).json({
        
        data : data
    })
})

router.post('/', async(req,res) =>{
    const data = req.body
    const data1 = await cookingList.create(data)
    
    res.status(200).json({
        
        data : data1
    })
})


module.exports = router