const express=require("express");
const router=express.Router({mergeParams:true});
const {protect,restrictTo}=require("../Controller/AuthController")
const {createOrder,getOrder,getAllOrder,updateOrder,deleteOrder,getStatus}=require("../Controller/OrderController");
router.use(protect)

router.route("/").post(createOrder).get(getAllOrder)
router.route("/:id").patch(updateOrder).get(getOrder).delete(deleteOrder)
router.use(restrictTo('admin'))

router.patch("/status/:id",getStatus);
module.exports=router