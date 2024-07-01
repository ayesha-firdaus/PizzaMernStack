const  mongoose = require("mongoose");
const Pizza=require("../Model/PizzaModal");
 const reviewSchema=new mongoose.Schema({
    review:{
        type:String,
        required:true,
    },
    rating:{
        type:Number,
        required:true,
        min:1,
        max:5,

    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    pizzaId:{
        type:mongoose.Schema.ObjectId,
        ref:'Pizza',
        required:[true,"Review must belong to a pizza"]
    },
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,"Review must belong to a user"]

    }
 },{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
 })
 reviewSchema.statics.calcAverageRating=async function(id){
    const stats=await this.aggregate([
        {
            $match:{pizzaId:id}
        },
        {
            $group:{
                _id:'$pizzaId',
                nRating:{$sum:1},
                avgRating:{$avg:'$rating'}
            }
        }
    ])
    if(stats.length>0){
        await  Pizza.findByIdAndUpdate(id,{
            ratingsQuantity:stats[0].nRating,
            ratingsAverage:stats[1].avgRating,
        })
    }
    else{
        await  Pizza.findByIdAndUpdate(id,{
            ratingsQuantity:0,
            ratingsAverage:4.5,
        })
    }

    console.log(stats)
 }
 reviewSchema.pre(/^findOneAnd/,async function(next){
    this.r=await this.findOne();
    console.log(this.r);
    next();
 })
 reviewSchema.post(/^findOneAnd/,async function(){
    await this.r.constructor.calcAverageRating(this.r.pizzaId);
 })

 reviewSchema.post('save',function()
 {
    this.constructor.calcAverageRating(this.pizzaId);
    
 })
 reviewSchema.pre(/^find/,function(next){
  this.populate({
    path:'userId',
    select:'name'
  }).populate({
    path:"pizzaId",
    select:"name price"
  })
  next();
 })

 const review=mongoose.model('Review',reviewSchema);
 module.exports=review;