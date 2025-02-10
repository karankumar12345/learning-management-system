const mongoose =require("mongoose");


require("dotenv").config();



const uri= process.env.DB_URL;

if(!uri){
    throw new Error("Database connection URL is missing in Environment variable ")

}


const connectDB =async()=>{
    try {

        await mongoose.connect(uri);
        console.log("MongoDB Connected ");

        
    } catch (error) {
        console.error(`Error connecting to mongoDB: ${error.message}`);
        setTimeout(()=>connectDB(),5000);

        
    }
}

module.exports=connectDB