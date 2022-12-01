const Product  =require("../models/productModel")
const ErrorHander = require("../utils/errorhander")
const catchAsyncErrors = require("../middleware/catchAsyncError")
const ApiFeatures = require("../utils/apiFeatures")


 
// create Product - Admin
exports.createProduct  = catchAsyncErrors(async (req,res,next)=>{

   req.body.user = req.user.id
    const product = await Product.create(req.body)
    res.status(201).json({
        success:true,
        product
    })
})
 
// All Product 
exports.getAllProducts = catchAsyncErrors(async (req,res)=>{
    const resultperPage = 5;
    const productCount =await Product.countDocuments()
   const apiFeatures = new ApiFeatures(Product.find(),req.query).search().pagination(resultperPage)
    const product =  await apiFeatures.query
    res.status(201).json({
      success:true,
      product,
      productCount
  })
  });

// Single Product Details
exports.getProductsDetails = catchAsyncErrors(async (req,res,next)=>{
    const  product  = await Product.findById(req.params.id)
 if(!product){
    return next(new ErrorHander("Product Not Found",404))
 }
 res.status(200).json({
    success:true, 
    product 
})
});


// update Product - Admin

exports.updateProduct = catchAsyncErrors(
    async (req,res,next)=>{
        let product = await Product.findById(req.params.id)
        if(!product){
            return next(new ErrorHander("Product Not Found",404))
      
            }
        
        product = await Product.findByIdAndUpdate(req.params.id,req.body, {
            new:true
        })
        res.status(200).json({
            success:true,
            product
        })
    }
);

// Delete Product - Admin

exports.deleteProduct = catchAsyncErrors(async (req,res,next)=>{
    const  product  = await Product.findById(req.params.id)
    if(!product){
       return next(new ErrorHander("Product Not Found",404))
    }
   
    await product.remove();
    res.status(200).json({
       success:true,
       msg:"Product Deleted"
    })
                
   });


//    create reviews and rating

exports.createProductReviews = catchAsyncErrors(async (req,res,next)=>{
    const { rating,comment, productId } = req.body
    const review = {
        user: req.user._id,
        name:req.user.name,
        rating: Number(rating),
        comment,
        productId

    }

    const product = await Product.findById(productId)

    const isReviewed = await product.reviews.find(rev=> rev.user.toString()===req.user._id.toString())
    if(isReviewed){
            product.reviews.forEach((rev)=>{
                if(rev=> rev.user.toString()===req.user._id.toString())
                   (rev.rating = rating),
                    (rev.comment = comment)
    
                
               
            })
    }
    else{
        product.reviews.push(review)
        product.numofReviews =product.reviews.length

    }

    // 5,4,4,3
    let avg=0
    product.reviews.forEach((rev)=>{
        avg+=rev.rating
    })
    product.ratings=avg
    /product.reviews.length;


    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true
    })
})

// get Product Reviews
exports.getProductReview =catchAsyncErrors(async(req,res,next)=>{
const product =await Product.findById(req.query.id)
if(!product){
    return next(new ErrorHander("Product not found",404))
}

res.status(200).json({
    success:true,
    reviews:product.reviews
})
})


// Delete Product reviews
exports.deleteReview = catchAsyncErrors(async (req,res,next)=>{
    const  product = await Product.findById(req.query.productId)

    if(!product){
      return next(new ErrorHander("product not found", 404))
    }
    const reviews =await product.reviews.filter(rev=> rev._id.toString()!=req.query.id.toString())


    let avg=0
    reviews.forEach((rev)=>{
        avg+=rev.rating
    })
    const ratings=avg/reviews.length;
    const numofReviews = reviews.length

    await Product.findByIdAndUpdate(req.query.productId,{
        reviews,
        ratings,
        numofReviews
    },{new:true,runValidators:true,useFindAndModify:false})


    await product.save({validateBeforeSave:false})
    res.status(200).json({
        success:true
    })

  })