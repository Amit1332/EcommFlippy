const mongoose = require('mongoose')
const productScheam = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter product name"]
    },
    description:{
        type:String,
        required:[true,"please enter product desscription"]
    },
     price:{
        type:Number,
        required:[true,"please enter product price"],
        maxLength:[8,"cannot exceed max 8 character"]
    },
    ratings:{
        type:Number,
        default:0
    },   
    images:[
        {
          public_id:{
            type:String,
            required:true
          },
          url:{
            type:String,
            required:true
          }
          
        }
    ],
    category:{
        type:String,
        required:true
    },
    stock:{
        type:Number,
        required:[true , 'please enter Product Stock'],
        maxLength:[4,'stock cannot exceed 4 character'],
        default:1
    },
    numofReviews:{
        type:Number,
        default:0

    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                require:true
            },
            rating:{
                type:Number,
                require:true
                
            },
            comment:{
                type:String,
                require:true
            }

        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }

    
})

module.exports = mongoose.model("product", productScheam)