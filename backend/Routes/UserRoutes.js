const express=require("express");
const router=express.Router();

const {createUser,resizeUserPhoto,uploadUserPhoto,getUser,getAllUser,AddMe,deleteMe,updateMe,updateUser,deleteUser}=require("../Controller/UserController");
const {protect,restrictTo}=require("../Controller/AuthController");
const OrderRoutes=require("../Routes/OrderRoutes");

router.use(protect)
router.patch('/updateMe',updateMe);
router.delete('/deleteMe', deleteMe);
router.get('/addMe',AddMe,getUser)
router.use(restrictTo('admin'));
router.route("/").post(createUser).get(getAllUser)
router.route("/:id").patch(updateUser).get(getUser).delete(deleteUser)

router.use("/:userId/orders",OrderRoutes);
module.exports=router;