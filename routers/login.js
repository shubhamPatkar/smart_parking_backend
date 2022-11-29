const express = require("express");
const router = express.Router();
const Login = require("../modals/login");
const bearer_token = require("./bearer_token");
const jwt = require("jsonwebtoken");
const fs = require("fs");

router.get("/getLoginDetails/:userName/:password", async(req,res)=>{
        try{
            debugger;
            const query = {userName:req.params.userName,password:req.params.password}
            const loginData = await Login.findOne(query);
            if(loginData)
            {
            jwt.sign({},"secretKey",(err,token)=>{
                fs.writeFile("./routers/token.json",token,(err)=>{
                    if(err)
                    {
                        console.log(err);
                    }
                })
                res.json({
                    message:"Successfully login",
                    loginData,
                    token
                })
            });
        }else{
            res.json({
                message:"Not valid data",
                loginData
            })
        }
        }
        catch(err)
        {
            res.status(401).send("Error occured ",err);
        }
            
    });

    router.get("/getLoginDetailsbyId/:id", bearer_token.verifyToken,async(req,res)=>{
        try{
                const loginData = await Login.findById(req.params.id);
                res.json({
                    message:"data fetched",
                    loginData
                });
            }catch(err)
            {
                console.log(err);
            }
                    
            });

router.post("/saveLoginDetails", async(req,res)=>{
    try{
            if(req.body?.userName && req.body?.firstName && req.body?.lastName && req.body?.mobileNo &&req.body?.vehicleNo)
            {
                const login = new Login({
                    "userName":req.body.userName,
                    "firstName":req.body.firstName,
                    "lastName":req.body.lastName,
                    "mobileNo":req.body.mobileNo,
                    "password":req.body.mobileNo,
                    "profile":"Guest",
                    "vehicleNo":req.body.vehicleNo
                })
                const loginData = await login.save();
                jwt.sign({},"secretKey",(err,token)=>{
                    fs.writeFile("./routers/token.json",token,(err)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                    })
                    res.json({
                        message:"Successfully login",
                        loginData,
                        token
                    })
                });
            }else{
                const loginData = {};
                res.json({
                    message:"Data not valid",
                    loginData
                });
            }
            
        }catch(err)
        {
            res.send("Error occured ",err);
        }
    });

module.exports = router;