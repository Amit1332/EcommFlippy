const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const crypto  = require("crypto")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please Enter User name"],
        maxLength:[30,"name cannot excced 30 character"],
        minLength:[8,"Name should be more than 8 character"]

    },
    email:{
        type:String,
        required:[true, "please enter  email address"],
        unique:true,
        validate:[validator.isEmail,"Please enter valid email address"]
    },
    password:{
        type:String,
        require:[true,"please enter your password"],
        minLength:[8,"password should be more than 8 character"],
        select:false
    },
    avatar:{
        public_id:{
           type:String,
           required:true
        },
        url:{
            type:String,
            required:true
        }
    },
    role:{
        type:String,
        default:"user"
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
})

userSchema.pre('save', async function(next){
     if(!this.isModified('password')){    
    next();
     }
     this.password = await bcrypt.hash(this.password, 10);

});

//JWT Token

userSchema.methods.getJWTTOKEN = function (){
    return jwt.sign({id:this._id},process.env.JWT_SECRET,{
        expiresIn:process.env.JWT_EXPIRE,
    })
};

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){  
return await bcrypt.compareSync(enteredPassword,this.password)
   
}

// Generating Password Token
userSchema.methods.getResetPasswordToken = function(){
    // generating Token
    const resetToken  = crypto.randomBytes(20).toString("hex")

    // Adding and hasing resetpassword token to usersccchema
    this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
   this.resetPasswordExpire = Date.now()+15*60*1000   

   return resetToken  ;
}



module.exports = mongoose.model("User",userSchema)
