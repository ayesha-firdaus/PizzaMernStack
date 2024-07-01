class AppError extends Error{
    constructor(statusCode,message){
        super();
       this.message=message;
       this.statusCode=statusCode;
       this.status=`${statusCode}`.startsWith(400)?'error':'fail';
       this.operationalError=true;
       Error.captureStackTrace(this,this.constructor);
       

    }
}
module.exports=AppError;