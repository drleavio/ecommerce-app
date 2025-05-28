const express=require("express");
const User=require("../schema/userSchema")
const bcryptjs=require("bcryptjs");
const connect = require("../db/connectDB");
const router=express.Router();
const jwt=require("jsonwebtoken")

router.post("/signup",async(req,res)=>{
    const {username,password}=req.body;
    console.log(username);
    
   try {
   await connect()
    const exist=await User.findOne({username});
    if(exist){
        return res.json({
            message:"user already exist"
        })
    }
    const hashedPassword=await bcryptjs.hash(password,10);
    const response=await User.create({
        username,
        password:hashedPassword
    })
    if(response){
        return res.json({
            message:"user created successfully"
        })
    }
   } catch (error) {
        console.log(error);
        return res.json({
            message:"error adding user"
        })
   }
})

router.post("/signin",async(req,res)=>{
    const {username,password}=req.body;
    try {
        await connect();
        const exist=await User.findOne({username});
        
        if(!exist){
            return res.json({
                message:"user does not exist"
            })
        }
        const check=await bcryptjs.compare(password,exist.password);
        
        if(!check){
            return res.json({
                message:"password is incorrect"
            })
        }
        const payload={username};
        const token=await jwt.sign(payload,"password");
        return res.json({
            message:"signin successfully",
            token
        })
    } catch (error) {
        console.log(error);
        
    }
})

module.exports=router