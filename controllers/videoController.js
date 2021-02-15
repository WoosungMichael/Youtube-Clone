import routes from "../routes";
import Video from "../models/Video";

//Home

export const home = async (req, res) => { //async는 JavaScript에게 이 function의 어떤 부분은 꼭 기다려야한다고 알려줌
  try {
    const videos = await Video.find({}).sort({ _id: -1 }); //await : 다음 과정이 끝날 때까지 기다려라 (await과 async는 세트), -1 : 위 아래 순서를 바꾼다
    res.render("home", { pageTitle: "Home", videos });
  } catch (error) {
    console.log(error);
    res.render("home", { pageTitle: "Home", videos: [] });
  }
};

//Search

export const search = async(req, res) => {
    const {
      query: { term: searchingBy }
    } = req;
    let videos = [];
    try {
      videos = await Video.find({
        title: { $regex: searchingBy, $options: "i" } //$regex: 포함하는거 모두 찾기, [$options: "i" ]: 대소문자 구분X
      });
    } catch (error) {
      console.log(error);
    }
    res.render("search", { pageTitle: "Search", searchingBy, videos });
  };

  //Upload

export const getUpload = (req, res) =>
  res.render("upload", { pageTitle: "Upload" });

export const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path }
  } = req;
  // To Do: Upload and save video
  const newVideo = await Video.create({
    fileUrl: path,
    title,
    description,
    creator: req.user.id
  });
  req.user.videos.push(newVideo.id);
  req.user.save();
  res.redirect(routes.videoDetail(newVideo.id));
};

//Video Detail

export const videoDetail = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id).populate("creator");
    res.render("videoDetail", { pageTitle: video.title, video });
  } catch (error) {
    res.redirect(routes.home);
  }
};

//Edit Video

export const getEditVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      res.render("editVideo", { pageTitle: `Edit ${video.title}`, video });
    }
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const postEditVideo = async (req, res) => {
  const {
    params: { id },
    body: { title, description }
  } = req;
  try {
    await Video.findOneAndUpdate({ _id: id }, { title, description });
    res.redirect(routes.videoDetail(id));
  } catch (error) {
    res.redirect(routes.home);
  }
};

//Delete Video

export const deleteVideo = async (req, res) => {
  const {
    params: { id }
  } = req;
  try {
    const video = await Video.findById(id);
    if (video.creator !== req.user.id) {
      throw Error();
    } else {
      await Video.findOneAndRemove({ _id: id });
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};