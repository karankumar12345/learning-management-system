const mongoose =require("mongoose");
const feedbackSchema=new mongoose.Schema({
    //user data
   // user title 

   //feedback message 
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
   },
   jobtypes:{
    type:String,
    required:true,
   
   },
   message:{
    type:String,
    required:true,
   },
   avatar:{
    public_id:{
        type:String,
        required:true,
    },
    url:{
        type:String,
        required:true,
    
    }
   }



},{timestamps:true})
const Feedback=mongoose.model("Feedback",feedbackSchema);
module.exports=Feedback;
