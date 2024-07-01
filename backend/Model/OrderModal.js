const mongoose=require("mongoose");
const OrderSchema=new mongoose.Schema({
    "userId":    { type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
       },
        orderDate:{
            type:Date,
            required:true,
            default:Date.now,

        },
        totalPrice:{ 
            type:Number,
        required:true
    },
        status:{ type:String,
            enum:{
                values:["pending", "confirmed", "delivered"],
                message:"it could be only pending, confirmed, delivered",
            }
         },// e.g., "pending", "confirmed", "delivered"
        cart: {
            type:[Object],
            required:true,
        },
        created_at: {
            type:Date,
            required:true,
            default:Date.now,
        },
        
        isPaid:{
            type:Boolean,
            required:true,
        },
        address:{
            type:String,
            required:true
        },
        phoneNumber:{
            type:Number,
            min:10,
            required:true

            
        }
    
    
},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
 })
// searching for user its order is there
OrderSchema.pre(/^find/,function(next){
    this.populate({
        path:"userId",
         select:"-__v -passwordChangedAt"
    })
    next();
})
const Order=mongoose.model('Order',OrderSchema);
module.exports=Order;