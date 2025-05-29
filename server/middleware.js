const jwt=require("jsonwebtoken");
const User = require("./schema/userSchema");
const connect=require("./db/connectDB")

const checkToken=async(req,res,next)=>{
    const tokendata=req.headers.authorization;
    const token=tokendata.split(" ")[1];
    const decoded=jwt.verify(token,"password");
    const tok=decoded.username;
   
    
    if(decoded){
        await connect()
        const response = await User.findOne({ username: tok });
        req.userId=response._id;
        // console.log(response,"response");
        
        
        next();
    }else{
        return res.json({
            message:"user is invalid"
        })
    }
}
module.exports=checkToken