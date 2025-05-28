const express=require("express");
const cors=require("cors")
require('dotenv').config();
const app=express();
const userRoutes=require("./routes/userRoutes")
const authRoutes=require("./authRoutes/authRoutes")
app.use(cors());
app.use(express.json());
app.use("/api",userRoutes);
app.use("/auth",authRoutes)
app.get('/', (req, res) => {
    res.send('Welcome to the API!');
  });

app.listen(3001,()=>{
    console.log("app is running");
})