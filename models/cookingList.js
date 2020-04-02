const mongoose = require('mongoose')

const cookingSchema = mongoose.Schema({
    name : {
        type : String
    },

    quantity :{
        type : String
    }
})



module.exports = mongoose.model('cookingList', cookingSchema)