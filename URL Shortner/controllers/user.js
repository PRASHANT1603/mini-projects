import User from "../models/user.js";
import {v4} from "uuid";
import {setUser} from "../service/auth.js";

async function handleUserSignUp(req, res) {

  const { username,email, password } = req.body;
  await User.create({username, email, password});
  return res.render("home");
  
}

async function handleUserLogin(req, res) {

  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("login",{
       error: "Invalid email or password" });
  }
  
  const token = setUser(user);
  res.cookie("uid", token);
  return res.redirect("/");



  return res.redirect("/");
  
}

export { handleUserSignUp, handleUserLogin };