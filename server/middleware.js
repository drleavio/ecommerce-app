const jwt=require("jsonwebtoken");
const User = require("./schema/userSchema");
const connect=require("./db/connectDB")

const checkToken=async(req,res,next)=>{
    const tokendata=req.headers.authorization;
    const token=tokendata.split(" ")[1];
    const decoded=jwt.verify(token,"password");
    if(decoded){
        await connect()
        req.username=await User.findById(decoded.id);
        console.log(req.username);
        
        next();
    }else{
        return res.json({
            message:"user is invalid"
        })
    }
}
module.exports=checkToken