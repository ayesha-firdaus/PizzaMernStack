const express=require("express");
const router=express.Router();
const {protect,restrictTo}=require("../Controller/AuthController")
const ReviewRoutes=require("../Routes/ReviewRoutes");
const {uploadUserPhoto,resizeUserPhoto,createPizza,getPizza,getAllPizza,updatePizza,deletePizza}=require("../Controller/PizzaController");
router.route("/").post(protect,restrictTo("admin"),uploadUserPhoto,resizeUserPhoto,createPizza).get(getAllPizza)
router.route("/:id").patch(protect,restrictTo("admin"),updatePizza).get(getPizza).delete(protect,restrictTo("admin"),deletePizza)
router.use("/:pizzaId/reviews",ReviewRoutes);
module.exports=router;
