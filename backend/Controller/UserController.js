const User =require("../Model/UserModel");
const HandleFactory=require("../Controller/HandleFactory");
const CatchAsync=require("../utils/CatchAsync");
const multer=require("multer")
const sharp=require("sharp")
// const multerStorage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,'public/img/users')
//     },
//     filename:(req,file,cb)=>{
//         console.log(req,req.user)
//         // filename structure= user-userid-timestamp.jpeg
//         const ext=file.mimetype.split('/')[1];
//         cb(null,`user-${req.user.id}-${Date.now()}.${ext}`)
//     }
// })
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


exports.createUser=HandleFactory.CreateDoc(User);
exports.getUser=HandleFactory.GetDoc(User,{path:'order'});
exports.getAllUser=HandleFactory.GetAllDoc(User);
exports.updateUser=HandleFactory.UpdateDoc(User);
exports.deleteUser=HandleFactory.DeleteDoc(User);
function FilteredObj(requestedBody,...allowedFeild)
{
    const newObj={};
    Object.keys(requestedBody).forEach(el=>{
        if(allowedFeild.includes(el))
            {
                newObj[el]=requestedBody[el];
            }

    })
    return newObj;
}

exports.resizeUserPhoto=(req,res,next)=>{
    if(!req.body.photo) return next();
    req.body.photo=`user-${req.user.id}-${Date.now()}.jpeg`;
    sharp( req.body.photo.buffer)
    .resize(500,500)
    .toFormat('jpeg')
    .jpeg({quality:90})
    .toFile(`public/img/users/${req.body.photo}`)
}


exports.updateMe=CatchAsync(async (req,res,next)=>{
  
    if(req.body.password||req.body.passwordConfirm)
        {
            return next(new AppError( 404,'No updation of password with this route'));
        }
    const filterobj=FilteredObj(req.body,"name","email")
    if( req.body.photo) filterobj.photo= req.body.photo
    console.log(filterobj)
    const user=await User.findByIdAndUpdate(req.user.id,filterobj,{runValidators:true,new:true});
  
    res.status(200).json({
        status:"sucess",
        message:"All user updated Sucessfully",
        data:{
            user
        }
    })

})
exports.deleteMe=CatchAsync(async (req,res,next)=>{
    const user=await User.findByIdAndUpdate(req.user._id,{active:false},{runValidators:true,new:true})
    res.status(200).json({
        status:"sucess",
        message:" user deleted Sucessfully",
        data:{
            user
        }
    })
})
exports.AddMe=CatchAsync(async (req,res,next)=>{
    req.params.id=req.user.id;
    next()
})
