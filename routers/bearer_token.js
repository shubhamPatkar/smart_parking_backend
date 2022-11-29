const express = require("express");
const jwt = require("jsonwebtoken");
const login  = require("../modals/login");
const fs = require("fs")
const token = express();

function verifyToken(req,res,next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerToken !== undefined)
    {
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken;
        const savedToken  = fs.readFileSync("routers/token.json","utf-8");
        
            if(savedToken==bearerToken)
            {
                next();

            }else{
                res.sendStatus(403);

            }
        
    } else {
        res.sendStatus(403);
    }
}
   
    token.post("/api/login", async(req,res)=>{
        try{
             const loginData = await login.findById(req.loginId);
             if(loginData)
             {
                jwt.sign({},'secretKey',(err,token)=>{
                    fs.writeFile("./routes/token.json",token,(err)=>{
                        if(err)
                        {
                            console.log(err);
                        }
                    })
                    res.json({
                        token
                    })
                });
             }
        } catch(err)
        {
            res.send("Error occured");
        }
    })

 module.exports ={verifyToken};