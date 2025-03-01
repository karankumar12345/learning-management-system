const { catchAsync } = require("../middleware/catchAsync");
const Feedback = require("../models/feedback.model");
const ErrorHandler = require("../utils/ErrorHandler");
const cloudinary = require('cloudinary');

const createFeedback =catchAsync(async(req,res,next)=>{
    try {
        const data =req.body;
        const {avatar} =data;
        if(!avatar){
            return next(new ErrorHandler("Please upload your avatar",400))
        }
        if(avatar){
            const myCloud=await cloudinary.v2.uploader.upload(avatar, {
                folder:"feedbackavatar"
            }
        )

        data.avatar={
            public_id:avatar.public_id,
            url:avatar.secure_url
        }
    }
    await Feedback.create(data);
    res.status(201).json({
        success:true,
        message:"Feedback submitted successfully"
    })

        
    } catch (error) {
        return next(new ErrorHandler(error.message,400))
        
    }
})

//deleteFeedback by ourself 
const deleteFeedback =catchAsync(async(req,res,next)=>{
    try {
        const {id}=req.params;
        const feedback=await Feedback.findById(id);
        if(!feedback){
            return next(new ErrorHandler("Feedback not found", 404))
        }
        await feedback.remove();
        res.status(200).json({
            success:true,
            message:"Feedback deleted successfully"
        })

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})

//update Feedback
const updateFeedback =catchAsync(async(req, res, next)=>{
    try {
        const {id}=req.params;
        const feedback=await Feedback.findById(id);
        if(!feedback){
            return next(new ErrorHandler("Feedback not found", 404))
        }
        const data=req.body;

        
        if(data.avatar!==feedback.avatar){
            const myCloud=await cloudinary.v2.uploader.upload(data.avatar, {
                folder:"feedbackavatar"
            }
        )
        await cloudinary.v2.uploader.destroy(feedback.avatar.public_id);
        data.avatar={
            public_id:myCloud.public_id,
            url:myCloud.secure_url
        }
        }
        const updatedFeedback=await Feedback.findByIdAndUpdate(id, data, {new:true});
        res.status(200).json({
            success:true,
            message:"Feedback updated successfully",
            updatedFeedback
        })

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }

})
//get all feedbacks
const getAllFeedbacks =catchAsync(async(req, res, next)=>{
    try {
        const feedbacks=await Feedback.find();
        res.status(200).json({
            success:true,
            feedbacks
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})
//delete feedback by admin
const deleteFeedbackbyAdmin =catchAsync(async(req, res, next)=>{
    try {
        const {id}=req.params;
        const feedback=await Feedback.findById(id);
        if(!feedback){
            return next(new ErrorHandler("Feedback not found", 404))
        }
        await feedback.remove();
        res.status(200).json({
            success:true,
            message:"Feedback deleted successfully"
        })

    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400))
    }
})
module.exports={createFeedback, deleteFeedback, updateFeedback, getAllFeedbacks, deleteFeedbackbyAdmin}