const mongoose=require("mongoose");
const validator=require("validator");
const bcrypt=require("bcryptjs");
const crypto=require("crypto")
const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    passwordConfirm:{
        type:String,
        required:true,
        validate:{
            validator:function(val)
            {
                return val===this.password;
            },
            message:"Password and PasswordConfirm is not same"
        }
    },
    email:{
       type:String,
       required: true,
       unique:true,
    },
    role:{
       type:String,
    
       enum:{
        values:['admin','user'],
        message:"Either can  be admin and user",
       
       },
        default:"user"
      
    },
    photo:{
        type:String,
        default:'default.jpg'
    }
,
passwordChangedAt:{
    type:Date,
},
passwordResetToken:{
    type:String,
},
passwordResetTokenExpired:{
    type:Date
},
active:{
    type:Boolean,
    default:true,
    select:false,
}

},{
    toJSON:{virtuals:true},
    toObject:{virtuals:true}
 }
)
// path user se detail leke aao when every a new order is created
UserSchema.virtual('order',{
    ref:'Order',
    foreignField:'userId',
    localField:'_id'
})
UserSchema.pre('save',async function(next){
    if(!this.isModified('password'))
        {
            return next();
        }
    this.password=await bcrypt.hash(this.password,12);
    this.passwordConfirm=undefined;
    next();
}
)
UserSchema.pre(/^find/,function(next){
    this.find({active:{$ne:false}});
     next();
 })
UserSchema.methods.validatePassword=async(candidatePassword,userPassword)=>{
  
    return await bcrypt.compare(candidatePassword,userPassword);
}

UserSchema.methods.changedPasswordAfter= function(JWTtimestamp){
    if(this.passwordChangedAt&& this.isModified('password')){
        const passwordChangedAtTimestamp=parseInt(this.passwordChangedAt.getTime()/1000,10);
        return passwordChangedAtTimestamp>JWTtimestamp;
    }
    return false;
}
UserSchema.methods.generateUrl=function()
{
    const resetToken=crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetTokenExpired=Date.now()+10*60*1000;

    return resetToken;
}
const User=mongoose.model('User',UserSchema);
module.exports=User;