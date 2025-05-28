const mongoose=require("mongoose");

const connect=async()=>{
    
    const response=await mongoose.connect("mongodb+srv://drleavio:CP74UmKda2yIJiKe@cluster0.k9sm2do.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0")
    if(response){
        console.log("db connected successfully");
        
    }
}
module.exports=connect;