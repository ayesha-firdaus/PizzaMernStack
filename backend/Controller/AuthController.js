const CatchAsync=require("../utils/CatchAsync");
const User=require("../Model/UserModel");
const jwt=require("jsonwebtoken")
const {promisify}=require("util")
const crypto=require("crypto")
const AppError=require("../utils/AppError")
const Email = require("../utils/email");
const multer=require("multer")
const sharp=require("sharp")
const dotenv=require("dotenv")
dotenv.config({path:`${__dirname}/.env`})
const createSendToken=(user,statusCode,res)=>{

    const token=jwt.sign({id:user._id},process.env.jwt_secret,{expiresIn:process.env.jwt_expires_in});
    const jwtcookieoption={
        expires:new Date(Date.now()+process.env.jwt_cookie_expires_in*24*60*60*1000),
        httpOnly:true,
    }
    if(process.env.Node_Env==="production")
        {
            jwtcookieoption.secure=true;
        }
        res.cookie('jwt',token,jwtcookieoption)
        res.status(statusCode).json({
            status:"sucess",
            message:"sucessfull",
            data:user,
            token
      
        })
}
const multerStorage=multer.memoryStorage()
const multerFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image')){
        cb(null,true);
    }
    else{
        cb(new AppError(400,'Not an image Please upload only images'),false);
    }
}
const upload=multer({
    storage:multerStorage,
    fileFilter:multerFilter,
});
exports.uploadUserPhoto=upload.single('photo')
exports.resizeUserPhoto=(req,res,next)=>{
    if(!req.file) return next();
    req.file.filename=`pizza-${Date.now()}.jpeg`;
    sharp(req.file.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/img/pizzas/${req.file.filename}`)
}


exports.signup=CatchAsync(async (req,res,next)=>{
    const user=await User.create({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password,
        passwordConfirm:req.body.passwordConfirm,
       
    })
    const url=`${req.protocol}://${req.get('host')}`;
    await new Email(user,url).sendWelcome();
    if (req.file) {
        user.photo = req.file.filename;
    }
    user.password=undefined;
    createSendToken(user,200,res);
})
exports.login=CatchAsync(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password)
        {
            next(new AppError(400,"One of the input is not given"));
        }
   const user=await User.findOne({email}).select('+password');
   if(!user)
    {
     return next(new AppError(401,"the account belonging to this Id"));
    }
    const passwordCorrect=await user.validatePassword(password,user.password)
 
   if(!passwordCorrect)
   {
    next(new AppError(400,"Incorrect input"));
   }
   createSendToken(user,201,res);
    

})
// check token
// validate token
// find user
// check password
exports.protect=CatchAsync(async (req,res,next)=>{
    let token;
    if(req.headers?.authorization&&req.headers.authorization.startsWith('Bearer'))
        {
            token=req.headers.authorization.split(' ')[1];
        }
    else  if(req.cookies.jwt)
        {
            token=req.cookies.jwt;
        }
        if(!token)
            {
                return next(new AppError( 401,"You are not logged in"));
            }
            console.log(process.env.jwt_secret)
     const decoded=await promisify(jwt.verify)(token,process.env.jwt_secret);
   console.log(decoded)
     const user=await User.findById(decoded.id);
     if(!user)
        {
         return next(new AppError(401,"the account belonging to this Id does not exist"));
        }
        const checkPassword=user.changedPasswordAfter(decoded.iat);
      
    if(checkPassword)
        {
            return next(new AppError(401,"The password has been changed after the token has been issued, please login again"));  
        }
    
        req.user = user;
        next();
})

exports.isLoggedIn = CatchAsync(async (req, res, next) => {
  
     if( req.cookies?.jwt)
     {
          // Dispatch the action to reset user state
      
       
         const decoded = await promisify(jwt.verify)(req.cookies?.jwt, process.env.jwt_secret);
      
      const user = await User.findById(decoded.id);
     
    
      if (!user) {
        
        return next();
      }
    
      if (user.changedPasswordAfter(decoded.iat)) {
       
        return next();
      }
    
      res.locals.user = user;
      
   
    }
  next();
  });


   exports.LoginSession=CatchAsync(async (req, res,next) => {
    if (res.locals.user) {
        res.status(200).json({ user: res.locals.user });
    } else {
        res.status(401).json({ error: 'Not authenticated' });
    }
  });


  exports.logout=CatchAsync(async(req,res,next)=>{
     res.clearCookie("jwt");
     res.status(200).json({
        status:"success",
        message:"signout suceesfully"
       })
  })
  exports.restrictTo=(...roles)=>{
    return (req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new AppError(403,'you do not have permission to perform to this action'));
        }
        next();
    }
   
  }

exports.forgotPassword=CatchAsync(async (req, res,next) => {
    const {email}=req.body;
    if(!email){
        return next(new AppError(400,"Input required not given"));
    }
    const user=await User.findOne({email});
    if(!user)
        {
            return next(new AppError(400,"User is not found"));
        }
    const resetToken=user.generateUrl();
    await  user.save({validateBeforeSave:false})

    try{
        const resetUrl=`${req.protocol}://${req.get('host')}/${resetToken}`;
    await new Email(user,resetUrl).sendPasswordReset();
    res.status(200).json({
        status: 'success',
        message: 'Token sent to email!'
      });
    }

    catch(err){
        user.passwordResetToken=undefined;
        user.passwordResetTokenExpired=undefined;
        await user.save({ validateBeforeSave: false });
        return next(new AppError(404,"Error occured while sending email pleasetry again later"));
    }
})
exports.resetPassword=CatchAsync(async (req,res,next)=>{
    const hashedToken=crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user=await User.findOne({passwordResetToken:hashedToken});
    if(!user)
        {
            return next(new AppError(400,"User not found"));
    
        }
    const checkExpired=parseInt(user.passwordResetTokenExpired.getTime()/1000,10)>Date.now()
    if(checkExpired){
        return next(new AppError(400,"token expired"));  
    }
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm,
    user.passwordResetToken=undefined;
    user.passwordResetTokenExpired=undefined;
    await user.save();
    createSendToken(user,200,res);
})
exports.updatePassword=CatchAsync(async (req,res,next)=>{

    const user=await User.findById(req.user).select('+password');
  
    if(!user)
        {
            return next(new AppError(400,"User not found"))
        }
        const checkPassword=await user.validatePassword(req.body.currentpassword,user.password);
    if(!checkPassword)
    {
        return next(new AppError(400,"Password not correct"));
    }
    user.password=req.body.password;
    user.passwordConfirm=req.body.passwordConfirm;
    await user.save();
    createSendToken(user,200,res); 
})
