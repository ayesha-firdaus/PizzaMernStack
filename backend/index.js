const express = require("express");
const app = express();
const dotenv=require("dotenv")
const globalErrorHandler=require("./Controller/ErrorController")
const AppError=require("./utils/AppError")
const AuthRouter=require("./Routes/AuthRoutes");
const mongoose=require("mongoose")
const cookieParser=require("cookie-parser")
const PizzaRouter=require("./Routes/PizzaRoutes");
const UserRouter=require("./Routes/UserRoutes");
const ReviewRouter=require("./Routes/ReviewRoutes");
const OrderRouter=require("./Routes/OrderRoutes");
const helmet=require("helmet")
const xssClean=require('xss-clean')
const mongoSanitize=require("express-mongo-sanitize");
const rateLimit=require("express-rate-limit")
const hpp=require('hpp');
const favicon = require('serve-favicon');
const path =require("path")
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(cors()); 
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cookieParser())
// const limiter=rateLimit({
//     max:100,
//     windowMs:60*60*1000,
//     message:"too many request from this Ip,Please try again in an hour"
// })
// app.use('/api',limiter);
dotenv.config({path:`${__dirname}/.env`})
const port=process.env.NODE_PORT;
const db=process.env.DATABASE_URL;
// security http header
app.use(helmet());
// Data against XSS
app.use(xssClean())
app.use(bodyParser.json());
app.use(hpp())
app.use(express.json({limit:'10kb'}));
// Data sanitize against nosql query injection
app.use(mongoSanitize());
process.on('uncaughtException',err=>{
    console.log(err.name,err.message)
    console.log('uncaught exceptions 💥 Shutting down ...')
      process.exit(1);
  
})
app.use('/public', express.static(path.join(__dirname, 'public')));
mongoose.connect(db).then((con)=>console.log("database connected sucessfully"))
app.get("/",(req,res)=>{
    res.json({message:"hello"})
})
app.use("/api/v1/pizza",PizzaRouter);
app.use("/api/v1/auth",AuthRouter);
app.use("/api/v1/user",UserRouter);
app.use("/api/v1/review",ReviewRouter);
app.use("/api/v1/order",OrderRouter);
app.all("*",(req,res,next)=>{
    next(new AppError(404,`Can't find ${req.originalUrl} on this server!`))
})
app.use(globalErrorHandler);
const server=app.listen(port, () => {
    console.log("Server is listening");
});
// errors that oocur outside of the express somewhere in our code there is promise that got rejected
process.on('unhandledRejection',err=>{
    console.log(err.name,err.message)
    console.log('unhandled rejection 💥 Shutting down ...')
    server.close(()=>{  process.exit(1);})
  
})
