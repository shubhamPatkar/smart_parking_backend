const express = require("express");
const router = express.Router();
const Parking = require("../modals/parking");
const bearer_token = require("./bearer_token");
const jwt = require("jsonwebtoken");
const Login = require("../modals/login");

router.get("/getParkingDetails",  bearer_token.verifyToken, async(req,res)=>{
    try{
            const parkingData = await Parking.find();
            res.json({
                message:"data fetched",
                parkingData
            });
        }catch(err)
        {
            console.log(err);
        }
   
})

router.get("/getParkingDetailsById",  bearer_token.verifyToken, async(req,res)=>{
    try{
            if(req.body?.parkingId)
            {
                let parkingData = await Parking.findById(req.body.parkingId);
            res.json({
                message:"data fetched",
                parkingData
            });
            }else{
                const parkingData = {};
                res.json({
                    message:"Id not valid",
                    loginData
                });
            }
            
        }catch(err)
        {
            console.log(err);
        }
    });


router.put("/updateParkingDetails",  bearer_token.verifyToken, async(req,res)=>{
     try{
            if(req.body?._id && req.body?.date && req.body?.seatNo && req.body?.status)
            {
                const parking = await Parking.findById(req.body._id);
                    parking.loginId = req.body.loginId,
                    parking.date=req.body.date,
                    parking.seatNo=req.body.seatNo,
                    parking.status=req.body.status
                const parkingData = await parking.save();
            res.json({
                message:"Update successfully",
                parkingData
            });
            }else{
                const parkingData = {};
                res.json({
                    message:"Data not valid",
                    parkingData
                });
            }
            
        }catch(err)
        {
            console.log(err);
        }
   
})

module.exports = router;