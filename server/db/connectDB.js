const mongoose=require("mongoose");
require('dotenv').config();

const connect=async()=>{
    
    const response=await mongoose.connect(process.env.MONGO_URI)
    if(response){
        console.log("db connected successfully");
        
    }
}
module.exports=connect;