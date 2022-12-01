const User = require("../models/userModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail")
const crypto  = require("crypto")


exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "hjafhjahfja",
      url: "hsjfhja",
    },
  });
  sendToken(user, 201, res);
});

//LOGIN user
exports.loginUser = catchAsyncErrors(async (req, res, next) => {

const { email, password } = req.body;

//   //checking if user has given password and email both
  if (!email || !password) {
    return next(new ErrorHander("Please enter email and password", 400));
  }

   const user = await User.findOne({email}).select("+password") 
   if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
      } 

    const isPasswordMatched = await user.comparePassword(password)   
    if(!isPasswordMatched){
        return next(new ErrorHander("Password is incorrect", 400))
    }
     sendToken(user,200,res)
    
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "logged out succesfully",
  });
});

//forgot password
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new ErrorHander("user not found",404));
  }

  // Get resetToken
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
//   res.json({resetToken})

  
  const resetPasswordUrl = `${req.protocol}://${req.get( 
    "host"
  )}/api/v1/password/reset/${resetToken}`;
  const message = `Your password reset Token is :- \n\n ${resetPasswordUrl} \n\n if you have not requested this email please ignore this`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} succesfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });
    return next(new ErrorHander(error.message, 500));
  }
    
});



exports.resetPassword = catchAsyncErrors( async (req,res,next)=>{
 
    // creating token hash
    const resetPasswordToken = crypto                    
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");


    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: {$gt:Date.now()}
    })

    if(!user){
        return next(new ErrorHander("reset password token is invalid or expired", 400))
        
    }


    if(req.body.password !== req.body.confirmPassword){
        return next(new ErrorHander("password does not matched", 400))
    }

    user.password = req.body.password
    user.resetPasswordToken=undefined
    user.resetPasswordExpire = undefined
    
    await user.save()
    sendToken(user,200,res)

})

exports.getUserDetails =  catchAsyncErrors( async (req,res,next)=>{
 const user =await User.findById(req.user.id)

 res.status(200).json({
    success:true,
    user
 })
})


exports.updatePassword = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.user.id).select("+password")  
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword)   
    if(!isPasswordMatched){
        return next(new ErrorHander("Old Password is incorrect", 400))
    }

    if(req.body.newPassword !== req.body.confirmPassword){
        return next(new ErrorHander("password does not match", 400))
    }
    user.password = req.body.newPassword
    await user.save()

   sendToken(user,200,res)
    
})

exports.updateProfile = catchAsyncErrors( async (req,res,next)=>{
const newUserData = {
    name : req.body.name,
    email : req.body.email
}

const user = await User.findByIdAndUpdate(req.user.id,newUserData, {new:true,runValidators:true})

res.status(200).json({
    success:true,
    user
})

})

//    Get all users (admin)
exports.getAllUser = catchAsyncErrors(async (req,res,next)=>{
    const users = await User.find()

    res.status(200).json({
        success:true,
        users
    })
})
// /    Get single users (admin)
exports.getSingleUser = catchAsyncErrors(async (req,res,next)=>{
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorHander(`user does not exist with this id: ${req.params.id}`, 400))
    }

    await user.remove()
    res.status(200).json({
        success:true,
        user
    })
})

//  Update User Role -Admin
exports.updateUserRole = catchAsyncErrors( async (req,res,next)=>{
    const newUserData = {
        name : req.body.name,
        email : req.body.email,
        role : req.body.role
    }
    
    const user = await User.findByIdAndUpdate(req.params.id,newUserData, {new:true,runValidators:true})
    
    res.status(200).json({
        success:true,
        user
    })
    
    })

    // /  Delete User Role - Admin
exports.deleteUser = catchAsyncErrors( async (req,res,next)=>{
    
    
    const user = await User.findByIdAndDelete(req.params.id)
    if(!user){
        return next(new ErrorHander(`user does not exist with this id: ${req.params.id}`, 400))
    }

    res.status(200).json({
        success:true,
        message:"user deleted successfully"
        
    })
    
    })


    
