import "./db"; // db파일 자체를 임폴트해옴
import "./models/Video";
import express from "express";
import morgan from "morgan";
import rootRouter from "./routers/rootRouter";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";


const app = express();
const logger = morgan("dev");


//pug
app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");


//
app.use(logger);
app.use(express.urlencoded({ extended:true })); // html form을 이해한다


//Router
app.use("/", rootRouter);
app.use("/videos", videoRouter);
app.use("/users", userRouter);


//Middleware
const gossipMiddleware = (req,res,next) => {
    console.log(`${req.method} ${req.url}`);
    next();
};

const privateMiddleware = (req, res, next) => {
    const url = req.url;
    if(url === "/protected"){
        return res.send("<h1>Not Allowed</h1>");
    }
    else {
        console.log("Allowed, you may continue.");
        next();
    }
};

const handleHome = (req, res) => {
    return res.send("welekmf");
};

const handleProtected = (req, res) => {
    return res.send("Welcome to the private lounge.");
};


app.use(gossipMiddleware);
app.use(privateMiddleware);
app.get("/",handleHome);
app.get("/protected", handleProtected);

export default app;
