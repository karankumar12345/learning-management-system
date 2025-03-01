const { catchAsync } = require("../middleware/catchAsync.js");
const Documentation = require("../models/Documentation.model.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const cloudinary = require('cloudinary');




const CreateDocumentation=catchAsync(async(req,res,next)=>{
    try {

        const data=req.body;
        const {thumbnail} =data;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "thumbnail"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };

        }
        await Documentation.create(data)
        res.status(201).json({
            success:true,
            message:"Documentation created successfully"
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})
const deleteDocumentation=catchAsync(async(req,res,next)=>{
    try {
        


        await Documentation.findByIdAndDelete(req.params.id)
        res.status(200).json({
            success:true,
            message:"Documentation deleted successfully"
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,404));
        
    }
})

const editDocumentation=catchAsync(async(req,res,next)=>{
    try {
        const data=req.body;
        const {thumbnail} =data;
        if (thumbnail) {
            const myCloud = await cloudinary.v2.uploader.upload(thumbnail, {
                folder: "thumbnail"
            });
            data.thumbnail = {
                public_id: myCloud.public_id,
                url: myCloud.secure_url
            };

        }
        await Documentation.findByIdAndUpdate(req.params.id, data, {new:true});
        res.status(200).json({
            success:true,
            message:"Documentation updated successfully"
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})
const AllDocumentation=catchAsync(async(req,res,next)=>{
    try {
        const documentation=await Documentation.find()

        res.status(200).json({
            success:true,
            documentation
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})
const getSingleDocumentation=catchAsync(async(req,res,next)=>{
    try {
        const documentation=Documentation.findById(req.params.id)
        res.status(200).json({
            success:true,
            documentation
        })
    } catch (error) {
        return next(new ErrorHandler(error.message, 404))

    }

})




module.exports = {
  
       CreateDocumentation,
    deleteDocumentation,
    editDocumentation,
    AllDocumentation,
    getSingleDocumentation
}