const Review =require("../Model/ReviewModal");
const HandleFactory=require("../Controller/HandleFactory");

exports.setUserAndTour=(req,res,next)=>{
    if(!req.body.pizzaId) req.body.pizzaId=req.params.pizzaId;
    if(!req.body.userId) req.body.userId=req.user.id;
    next();
  }
exports.createReview=HandleFactory.CreateDoc(Review);
exports.getReview=HandleFactory.GetDoc(Review);
exports.getAllReview=HandleFactory.GetAllDoc(Review);
exports.updateReview=HandleFactory.UpdateDoc(Review);
exports.deleteReview=HandleFactory.DeleteDoc(Review);