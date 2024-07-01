const express=require("express");
const router=express.Router({mergeParams:true});
const {protect}=require("../Controller/AuthController");
const {createReview,getReview,getAllReview,setUserAndTour,updateReview,deleteReview}=require("../Controller/ReviewController");
router.route("/").post(protect,setUserAndTour,createReview).get(getAllReview)
router.route("/:id").patch(updateReview).get(getReview).delete(deleteReview)


module.exports=router;