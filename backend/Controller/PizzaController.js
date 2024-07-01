const Pizza =require("../Model/PizzaModal");
const HandleFactory=require("../Controller/HandleFactory");
const multer=require("multer")
const sharp=require("sharp")
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
    .toFile(`public/img/pizza/${req.file.filename}`)
    
  req.body.photoUrl = req.file.filename; 
}


exports.createPizza=HandleFactory.CreateDoc(Pizza);
exports.getPizza=HandleFactory.GetDoc(Pizza,{path:'reviews'});
exports.getAllPizza=HandleFactory.GetAllDoc(Pizza);
exports.updatePizza=HandleFactory.UpdateDoc(Pizza);
exports.deletePizza=HandleFactory.DeleteDoc(Pizza);
