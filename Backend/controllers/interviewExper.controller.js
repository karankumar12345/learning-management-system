
const { catchAsync } = require("../middleware/catchAsync.js");
const interviewexpModel = require("../models/interviewexp.model");
const ErrorHandler = require("../utils/ErrorHandler.js");



const CreateInterviewExper=catchAsync(async(req,res,next)=>{
    try {
        const data=req.body;
        
        await interviewexpModel.create(data);

        res.status(201).json({
            success:true,
            message:"Interview experience submitted successfully"
        })

        
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})

const UpdateInterviewExper=catchAsync(async(req,res,next)=>{
    try {
        await interviewexpModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.status(200).json({
            success:true,
            message:"Interview experience Updated Succesfully"
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})

const deleteInterviewExper=catchAsync(async(req,res,next)=>{
    try{
        await interviewexpModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Interview experience deleted successfully"
        })
    }
    catch(error){
        return next(new ErrorHandler(error.message,404))
    }
})

const AllInterviewExperByUser=catchAsync(async(req,res,next)=>{
    try {
        const interviewExper=await interviewexpModel.find({user:req.user._id});
        res.status(200).json({
            success:true,
            interviewExper
        })

        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})

const deleteInterviewExperByUser=catchAsync(async(req,res,next)=>{
    try {
        await interviewexpModel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            success:true,
            message:"Interview experience deleted successfully"
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})
//singelInterview View
const singleInterviewExper=catchAsync(async(req, res, next)=>{
    try {
        const interviewExper=await interviewexpModel.findById(req.params.id);
        res.status(200).json({
            success:true,
            interviewExper
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 404))

    }
})
module.exports = {
    CreateInterviewExper,
    UpdateInterviewExper,
    deleteInterviewExper,
    AllInterviewExperByUser,
    deleteInterviewExperByUser,
    singleInterviewExper

}