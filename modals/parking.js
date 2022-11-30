const mongoose = require('mongoose');

const parking = new mongoose.Schema({
    loginId:{
        type: String,
        required:true
    },
    date:{
        type: String,
        required:false
    },
    seatNo:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Parking",parking);