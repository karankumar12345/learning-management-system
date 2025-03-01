const express = require('express');
const {CreateCourses} =require

const coursesRoute=express.Router();


coursesRoute.post("/create-course",CreateCourses)



module.exports={
    coursesRoute
}