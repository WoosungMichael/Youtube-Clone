import "core-js";
import express from "express";
import morgan from "morgan"; //앞의 morgan 자리에 별명으로 써도 됨
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
const app = express();

const PORT = 4000;

const handleListening = () => console.log(`Listening on: http://localhost:${PORT}`);
/*
function handleListening(){
    console.log(`Listening on: http://localhost:${PORT}`);
}
*/

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

app.listen(PORT, handleListening);