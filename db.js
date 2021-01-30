import mongoose from "mongoose"; //mongoose : db랑 연결해주는 역할 (MongoDB : NoSQL Database로 규칙이 적고 유연함)
import dotenv from "dotenv";
dotenv.config(); //dotenv.config() 함수로 .env 파일 안의 정보를 불러올 수 있음

mongoose.connect(
  process.env.MONGO_URL,
  {
    useNewUrlParser: true,
    useFindAndModify: false
  }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅  Connected to DB");
const handleError = error => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);