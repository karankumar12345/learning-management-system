const { catchAsync } = require("../middleware/catchAsync");
const ErrorHandler = require("../utils/ErrorHandler");
import * as cloudinary from 'cloudinary';
import * as cloudinary from 'cloudinary';
import { Course } from '../models/courses.model';




const CreateCourses=catchAsync(async(req,res,next)=>{
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
        const course=await Course.create(data);
        res.status(201).json({
            success:true,
            course
        })
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})
//edit course
const editCourse=catchAsync(async(req,res,next)=>{
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
        await Course.findByIdAndUpdate(req.params.id, data, {new:true});
        res.status(200).json({
            success:true,
            message:"Course updated successfully"
        })
        
    } catch (error) {
        return next(new ErrorHandler(error.message,404))
        
    }
})
//deletecoursebysameuserthatcreat
const deleteCourse=catchAsync(async(req, res, next)=>{
    try {
        const {id}=req.params;
        const course=await Course.findById(id);
        if(!course){
            return next(new ErrorHandler("Course not found", 404))
        }
        await course.remove();
        res.status(200).json({
            success:true,
            message:"Course deleted successfully"
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 404))

    }
})
//get all courses
const getAllCourses=catchAsync(async(req, res, next)=>{
    try {
        const courses=await Course.find();
        res.status(200).json({
            success:true,
            courses
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 404))

    }
})
//get single course
const getSingleCourse=catchAsync(async(req, res, next)=>{
    try {
        const course=await Course.findById(req.params.id);
        res.status(200).json({
            success:true,
            course
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 404))

    }
})
//get all courses by same user that create
const getAllCoursesBySameUser=catchAsync(async(req, res, next)=>{
    try {
        const courses=await Course.find({user:req.user._id});
        res.status(200).json({
            success:true,
            courses
        })

    } catch (error) {
        return next(new ErrorHandler(error.message, 404))

    }
})

module.exports = {
    CreateCourses,
    editCourse,
    deleteCourse,
    getAllCourses,
    getSingleCourse,
    getAllCoursesBySameUser
}