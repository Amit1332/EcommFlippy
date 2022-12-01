// catch async error resolve -   async error aur server crash hone se bachne ke liye
module.exports =  theFunc => (req,res,next)=>{
    Promise.resolve(theFunc(req,res,next)).catch(next)
}