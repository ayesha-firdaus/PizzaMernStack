const Order =require("../Model/OrderModal");
const HandleFactory=require("../Controller/HandleFactory");
const CatchAsync = require("../utils/CatchAsync");
const AppError=require("../utils/AppError");
exports.createOrder = CatchAsync(async (req, res, next) => {
    // Include userId in the req.body if it's not already there
    req.body.userId = req.user._id;

    // Create a new order document using Order.create()
    const doc = await Order.create(req.body);

    // Respond with a success message and the created document
    res.status(201).json({
        status: "success",
        message: "Order created successfully",
        data: {
            order: doc
        }
    });
});
exports.getOrder=HandleFactory.GetDoc(Order);
exports.getAllOrder=HandleFactory.GetAllDoc(Order);
exports.updateOrder=HandleFactory.UpdateDoc(Order);
exports.deleteOrder=HandleFactory.DeleteDoc(Order);
exports.getStatus=CatchAsync(async (req,res,next)=>{
    const order=await Order.findByIdAndUpdate(req.params.id,{status:"delivered"},{runValidators:true,new:true});
    if(!order)
        {
        return  next(new AppError(400,"No document found with that ID"));
        }
        res.status(200).json({
            status:"success",
            message:"doc updated successfully",
           order
        })

})