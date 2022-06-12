import User from "../models/User";
import bcrypt from "bcrypt";

export const getJoin = (req,res) => res.render("join", { pageTitle: "Join"});
export const postJoin = async (req,res) => {
    const { name, username, email, password, password2, location } = req.body;
    const usernameExists = await User.exists({ username });
    if (password !== password2) {
        return res.status(400).render("join", {
            pageTitle: "Join", 
            errorMessage: "Password confirmation does not match." 
        });
    };
    if (usernameExists){
        return res.status(400).render("join", {  
            pageTitle: "Join", 
            errorMessage: "This username is already taken." 
        });
    };
    const emailExists = await User.exists({ email });
    if (emailExists) {
        return res.status(400).render("join", {
            pageTitle: "Join", 
            errorMessage: "This email is already taken." 
        });
    };
    // email or username
    // const exists = await User.exists({ $or: [{ username },{ email }] });
    // 둘 중 하나가 true 면 true 반환
    try {
        await User.create({
            name,
            username,
            email,
            password,
            location, 
         });
         return res.redirect("/login");
    } catch (error) {
        return res.status(400).render("join", {
            pageTitle: "Join", 
            errorMessage: error._message
        });
    };
    
};
export const getLogin = (req,res) => res.render("login", { pageTitle: "Login" });
export const postLogin = async (req,res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user){
        return res.status(400).render("login", { 
            pageTite: "Login", 
            errorMessage: "An account with this username does not exists."
        });
    };
    const ok = await bcrypt.compare(password, user.password);
    if (!ok){
        return res.status(400).render("login", { 
            pageTite: "Login", 
            errorMessage: "Wrong password"
        });
    };
    console.log("LOG USER IN! COMING SOON");
    return res.redirect("/");
}
export const edit = (req,res) => res.send("Edit User");
export const remove = (req,res) => res.send("Remove User");

export const logout = (req,res) => res.send("Log out");
export const see = (req,res) => res.send("See User");