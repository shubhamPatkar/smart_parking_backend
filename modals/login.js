const mongoose = require('mongoose');

const login = new mongoose.Schema({
    userName:{
        type: String,
        required:true
    },
    password:{
        type: String,
        required:true
    },
    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    vehicleNo:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model("Login",login);