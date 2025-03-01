const mongoose=require("mongoose")


const sectionSchema=new mongoose.Schema({
    heading:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    examples:{
        type:String,
        required:true,

    },
    references:{
        type:String
    }
})
const commentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    text:{
        type:String,
        required:true,
    },

},{timestamps:true})
const documentationSchema=new mongoose.Schema({
    title:{type:String,required:true},
    categpry:{

        type:String,
        required:true,

    },
  sections:[sectionSchema],
  contributors:[{type:mongoose.Schema.Types.ObjectId,
    ref:"User"}],

upvotes:{
    type:String,
    default:0   

},
comment:[commentSchema],
},{timestamps:true})

const Documentation=mongoose.model("Documentation",documentationSchema)
module.exports=Documentation
