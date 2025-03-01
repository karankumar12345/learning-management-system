const { catchAsync } = require("../middleware/catchAsync.js");
// const { UserModel } = require("../models/user.model.js");
const UserModel = require("../models/user.model.js");

const { SendToken } = require("../utils/SendToken.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const ejs = require("ejs");
const { SendMail } = require("../utils/SendMail.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const path = require("path");

// Function to Create Activation Token
const CreateToken = (user) => {
  const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
  const token = jwt.sign(
    { user, activationCode },
    process.env.ACTIVATION_SECRET,
    {
      expiresIn: "5m",
    }
  );

  return { token, activationCode };
};

// Activate User
const IActivatedUser = catchAsync(async (req, res, next) => {
  try {
    const { activation_token, activation_code } = req.body;
    const newUser = jwt.verify(activation_token, process.env.ACTIVATION_SECRET);

    if (newUser.activationCode !== activation_code) {
      return next(new ErrorHandler("Invalid activation code", 400));
    }

    const { name, email, password } = newUser.user;
    const existUser = await UserModel.findOne({ email });
    if (existUser) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const user = await UserModel.create({ name, email, password });

    await SendToken(user, 200, res);

    res.status(200).json({
      success: true,
      message: "User Registered Successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// Register User
const RegisterController = catchAsync(async (req, res, next) => {
  const { email, name, password } = req.body;

  console.log("UserModel:", UserModel);

  const isEmailExist = await UserModel.findOne({ email });
  if (isEmailExist) {
    return next(new ErrorHandler("Email already exists", 400));
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new UserModel({
    name,
    email,
    password: hash,
  });

  const activationToken = CreateToken(user);
  const activationCode = activationToken.activationCode;

  const data = { user: { name: user.name }, activationCode, year: new Date().getFullYear() };


  try {

    await SendMail({
      email: user.email,
      subject: "Activate Your Account",
      template: "registermail.ejs", 
      data: data,
    });

    res.status(201).json({
      success: true,
      message: `Please check your email: ${user.email} to activate your account`,
      activationToken: activationToken.token,
    });

    console.log("Mail Sent Successfully");
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
const loginUser =catchAsync(async(req,res,next)=>{
 try {
   const {email,password}=req.body;
   if(!email||!password){
     return next(new ErrorHandler("Please enter email and password",400))
   }
   const user=await UserModel.findOne({email}).select("+password");
   
   if(!user){
     return next(new ErrorHandler("Invalid email or password",400))
   }
   const isPasswordMatch=await bcrypt.compare(password,user.password);
 
   if(!isPasswordMatch){
     return next(new ErrorHandler("Invalid email or password ",400));
   }
 await SendToken(user,200,res);
 
 } catch (error) {
    return next(new ErrorHandler(error.message,400))
 }
  
})


const logoutUser=catchAsync(async(req,res,next)=>{
  try {

    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
    res.status(200).json({
      success: true,
      message: "Logged Out Successfully",
    });
    
  } catch (error) {
    return next(new ErrorHandler(error.message,400))
  }
})

 const UpdateUSerInfo=catchAsync(async(req,res,next)=>{
  try {
    const {name,email} =req.body;
    
    const user=await UserModel.findOne(email);
    if(!user){
      return next(new ErrorHandler("User not found",400));
   
    }
    if(name){
      user.name=name;
    }
    if(email){
      user.email=email;
    }
    res.status(200).json({
      success:true,
      message:"User information Updated Succesfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message,400))
    
  }
})
const updatePassword =catchAsync(async(req,res,next)=>{
  try {
    const {oldPassword,newPassword}=req.body;
    if(!oldPassword||!newPassword){
      return next(new ErrorHandler("Please enter old and new password", 400));
    }
    const user=await UserModel.findById(req.user._id).select("+password");

    if(!user) {
      return next(new ErrorHandler("user not found",404));
    }

    const isPasswordMatch=await bcrypt.compare(oldPassword, user.password);
    if(!isPasswordMatch){
      return next(new ErrorHandler("Invalid old password", 400));
    }
    user.password=newPassword;
    // gmail notif
    await user.save();

  res.status(200).json({
    success:true,
    message:"Password Updated Successfully"
  
  })

    
  } catch (error) {
      return next(new ErrorHandler(error.message,400));
  }
})
const getAllUsers=catchAsync(async(req, res, next)=>{
  try {
    const users=await UserModel.find();
    res.status(200).json({
      success:true,
      users
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
})
const getSingleUser=catchAsync(async(req, res, next)=>{
  try {
    const user=await UserModel.findById(req.params.id);
    if(!user){
      return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
      success:true,
      user
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
})
//updateuserRole
const updateUserRole=catchAsync(async(req, res, next)=>{
  try {
    const user=await UserModel.findById(req.params.id);
    if(!user){
      return next(new ErrorHandler("User not found", 404));
    }
    if(user.role==="user"){
      user.role="admin";
    }else{
      user.role="user";
    }
    await user.save();
    res.status(200).json({
      success:true,
      message:"User Role Updated Successfully"
    })
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
})

//delete user by admin
const deleteUserbyAdmin=catchAsync(async(req, res, next)=>{
  try {
    const { userId } = req.params;

    const user = await UserModel.findById(userId);

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    await user.remove();

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
})

const myProfile=catchAsync(async(req, res, next)=>{
  const user=await UserModel.findById(req.user._id);
  res.status(200).json({
    success: true,
    user,
  });
})


module.exports = {
  CreateToken,
  IActivatedUser,
  RegisterController,
  loginUser,
  logoutUser,
  myProfile,
  UpdateUSerInfo,
  updatePassword,
  getAllUsers,
  getSingleUser,
  updateUserRole,
  deleteUserbyAdmin

};