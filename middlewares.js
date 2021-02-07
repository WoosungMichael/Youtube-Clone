import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "uploads/videos/" }); // "/uploads/videos/"라고 쓰는 경우 해당 위치가 내 project file안에 있는 directory라고 생각함(내 컴퓨터의 root에 upload를 만듬)

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  res.locals.user = req.user || {};
  next();
};

export const uploadVideo = multerVideo.single("videoFile");