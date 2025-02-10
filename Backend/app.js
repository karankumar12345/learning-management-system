const express =require("express");


require("dotenv").config();



const app=express();



app.get("/test",(req,res)=>{
    res.json("Test Route ")
})




module.exports=app;


