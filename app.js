import "core-js";
import express from "express";
import morgan from "morgan"; //앞의 morgan 자리에 별명으로 써도 됨
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import {userRouter} from "./router"; //default로 export한게 아닌 경우
const app = express();

const handleHome = (req, res) => res.send("Hello from home");
/*
function handleHome(req, res){
    res.send("Hello from home");
}
*/

const handleProfile = (req, res) => res.send("You are on my profile");
/*
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

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(helmet()); //보안 강화
app.use(morgan("dev"));
//app.use(betweenHome); //순서 중요 get전에 쓴 모든 middleware 실행
//middleware에서 res.send를 실행하면 연결을 끊을 수 있다.

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);

export default app; //누군가 내 파일을 import할 때 app object를 주겠다는 뜻 