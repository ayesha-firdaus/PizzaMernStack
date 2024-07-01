const AppError = require("../utils/AppError");

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(400, message);
};

const handleDuplicateError = (err) => {
    const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
    const message = `Duplicate field value: ${value}. Please use another value!`;
    return new AppError(400, message);
};
const handleJWTError = () => new AppError(401, "Invalid token. Please log in again!");
const handleJWTExpired = () => new AppError(401, 'Your token has expired! Please log in again.');

const handleValidationError = (err) => {
    const errors = Object.values(err.errors).map((el) => el.message);
    const message = `Invalid input data. ${errors.join('. ')}`;
    return new AppError(400, message);
};

const sendProd = (err, res) => {
    if (err.operationalError) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    } else {
        res.status(500).json({
            status: "error",
            message: "Something went very wrong"
        });
    }
};
module.exports=(err,req,res,next)=>{
    let statusCode=err.statusCode||500;
    let status=err.status||'error';
    console.log(err)
    if(process.env.Node_env.trim()==="development"){
        res.status(statusCode).json({
            status,
            error:err,
            message:err.message
        })
    }
    else if(process.env.Node_Env.trim()==="production"){
        let error={...err};
        if(error.name==="CastError") error=handleCastError(err);
        if(error.code===11000) error=handleDuplicateError(error);
        if (error.name === "ValidationError") error = handleValidationError(error);
        if (error.name === "JsonWebTokenError") error = handleJWTError();
        if (error.name === "TokenExpiredError") error = handleJWTExpired();

        sendProd(error, res);
 
        }
    }
