export const join = (req, res) => res.render("join");
export const login = (req, res) => res.render("login");
export const logout = (req, res) => res.render("logout");
export const userDetail = (req, res) => res.render("userDetail");
export const editProfile = (req, res) => res.render("editProfile");
export const changePassword = (req, res) => res.render("changePassword");

//=> : implicit return
/*
    lalla = () => {
        return true
    }  : 중괄호를 적어주면 암시적 성격을 잃어서 return을 적어줘야함
*/