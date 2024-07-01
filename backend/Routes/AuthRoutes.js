const {isLoggedIn,uploadUserPhoto,resizeUserPhoto,signup,forgotPassword,login,resetPassword, updatePassword,protect, LoginSession, logout}=require("../Controller/AuthController");
const express=require("express");
const router=express.Router();
router.post("/login",login);
router.post("/signup",uploadUserPhoto,resizeUserPhoto,signup);
router.get("/isLogged",isLoggedIn,LoginSession);
router.post("/forgotpassword",forgotPassword)
router.patch("/resetpassword/:token",resetPassword)
router.patch("/updatepassword",protect,updatePassword)
router.get("/logout",logout)
module.exports=router;
