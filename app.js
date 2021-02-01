import "core-js";
import express from "express";
import morgan from "morgan"; //앞의 morgan 자리에 별명으로 써도 됨
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter"; //url을 분리하는 과정

//import {userRouter} from "./routers/userRouter"; //default로 export한게 아닌 경우
const app = express();

/*
const handleHome = (req, res) => res.send("Hello from home");
==same as
function handleHome(req, res){
    res.send("Hello from home");
}


const handleProfile = (req, res) => res.send("You are on my profile");
==same as
function handleProfile(req, res){
    res.send("You are on my profile");
}
*/

/*
const betweenHome = (req, res, next) =>{
    console.log("Between");
    next();
}
*/
app.use(helmet()); //보안 강화
app.set('view engine',"pug");
app.use("/uploads", express.static("uploads")); //express.static("uploads") : directory에서 file을 보내주는 middleware
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(morgan("dev")); //morgan 미들웨어의 역할: application에서 발생하는 모든 일들을 logging 하는 것
app.use(localsMiddleware);

//app.use(betweenHome); //순서 중요 get전에 쓴 모든 middleware 실행
//middleware에서 res.send를 실행하면 연결을 끊을 수 있다.

/*
app.get("/", handleHome);
app.get("/profile", handleProfile);
*/
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
    });
    
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app; //누군가 내 파일을 import할 때 app object를 주겠다는 뜻 