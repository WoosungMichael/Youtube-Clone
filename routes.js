//Global
const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";

//Users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-password";

//Videos
const VIDEOS = "/videos";
const UPLOAD = "/upload";
const VIDEO_DETAIL = "/:id"; //:를 붙여주면 express가 그 부분 값이 변하는 것을 인지함
const EDIT_VIDEO = "/:id/edit"; //controller에서 어떤 data를 가지고 있다는 것을 표현하고 싶으면 [:]과[이름]을 넣으면 됨
const DELETE_VIDEO = "/:id/delete";

// Github

const GITHUB = "/auth/github";
const GITHUB_CALLBACK = "/auth/github/callback";

const routes = {
    home: HOME,
    join: JOIN,
    login: LOGIN,
    logout: LOGOUT,
    search: SEARCH,
    users: USERS,
    userDetail: id => {
        if (id) {
          return `/users/${id}`;
        } else {
          return USER_DETAIL;
        }
      },
    editProfile: EDIT_PROFILE,
    changePassword: CHANGE_PASSWORD,
    videos: VIDEOS,
    upload: UPLOAD,
    videoDetail: id => {
        if (id) {
          return `/videos/${id}`;
        } else {
          return VIDEO_DETAIL;
        }
      },
    editVideo: id => {
        if (id) {
         return `/videos/${id}/edit`;
        } else {
         return EDIT_VIDEO;
        }
      },
    deleteVideo: id => {
        if (id) {
          return `/videos/${id}/delete`;
        } else {
          return DELETE_VIDEO;
        }
      },
      gitHub: GITHUB,
      githubCallback: GITHUB_CALLBACK
};

export default routes;