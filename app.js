const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const login  = require("./modals/login");
const bearer_token = require("./routers/bearer_token");

const url = "mongodb://127.0.0.1:27017/Smart_Parking"
const app = express();

mongoose.connect(url,{useNewUrlParser:true});

const loginRouter = require("./routers/login");
const parkingRouter = require("./routers/parking");

app.use(express.json());
app.use("/login",loginRouter);
app.use("/parking",parkingRouter);

mongoose.connection.on("open",function(){
    console.log("Database Connected");
})
app.listen(3000,()=>{
    console.log("server started at 3000")
})


    