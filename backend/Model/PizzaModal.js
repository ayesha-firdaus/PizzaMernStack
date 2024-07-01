const mongoose=require("mongoose");
const PizzaSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    ingredients:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    photoUrl:{
        type:String,
        required:true,

    },
    SoldOut:{
        type:Boolean,
        default:false,
    },
    ratingsAverage:{
        type:Number,
        default:4,
        min:0,
        max:5
    },
    ratingsQuantity:{
        type:Number,
        default:0
    },
    quantity:{
        type:Number,
        default:0,
        
    }
   
},     
    {
        toJSON:{virtuals:true},
        toObject:{virtuals:true}
     },

)
PizzaSchema.virtual("reviews",{
        ref:'Review',
        foreignField:'pizzaId',
        localField:'_id'
    })


const Pizza=mongoose.model('Pizza',PizzaSchema);
module.exports=Pizza;