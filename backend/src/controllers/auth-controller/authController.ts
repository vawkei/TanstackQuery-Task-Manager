import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../../models/User";
import jwt from "jsonwebtoken";

export const register = async (req: Request, res: Response) => {

  console.log("This is the register route");

  const { name, email, password } = req.body;
  console.log(name, email, password);

  if (!name || !email || !password) {
    res.status(400).json({ msg: "please fill out the inputs" });
    return console.log("please fill out the inputs");
  }

  if (password.trim().length < 6) {
    res.status(400).json({ msg: "password too short" });
    return console.log("password too short");
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  console.log("hashedPassword:", hashedPassword);

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(401).json({ msg: "user exists" });
      return console.log("user exists");
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("emailExistsError:", message);
    return res.status(500).json({ msg: message });
  }

  const userData = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  try {
    const registered = await User.create(userData);
    if (registered) {
      registered.isRegistered = true;
      await registered.save();
      console.log("new user registered");
      return res.status(200).json({msg:"new user registered"})
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("registeredError:", message);
    return res.status(500).json({ msg: message });
  }

  // console.log("This is the register route");
  // res.send("This is the register route");
};

export const login = async (req: Request, res: Response) => {

 console.log("This is the login route");

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ msg: "please provide email & password" });
    return console.log("please provide email & password");
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(404).json({ msg: "invalid credentials" });
      return console.log("invalid credentials");
    }

    if (!user.isRegistered) {
      res.status(404).json({ msg: "invalid credentials" });
      return console.log("you aint registered.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log("passwords dont match");
      return res.status(400).json({ msg: "invalid credentials" });
    }

    console.log("about to issue jwt cookie");
      
    const token = jwt.sign(
      { userId: user._id, userName: user.name },
      process.env.JWT_SECRET_V!,
      { expiresIn: "1d" }
    );

  
    if (user && isPasswordValid) {
      const oneDay = 1000 * 60 * 60 * 24;

      const { _id, name, email } = user;

      res.cookie("token", token, {
        path: "/",

        httpOnly: true,

        expires: new Date(Date.now() + oneDay),

        // secure:true,

        // sameSite:"none"
      });

      res
        .status(201)
        .json({ msg: "loggedin successfully", user: { _id, name, email } });
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "something went wrong";
    console.log("loginError:", message);
  }

  // console.log("This is the login route");
  // res.send("This is the login route");
};

export const logout =async (req:Request,res:Response)=>{
  console.log("the logout route")
  try{
    res.cookie("token","",{
      path:"/",
      httpOnly:true,
      expires:new Date(0),
      // secure:true,
      // sameSite:"none"
    });
    res.status(200).json({msg:"user logged out successfully"})
  }catch(error){
    const message = error instanceof Error? error.message:"something went wrong";
    console.log("logoutError:",message);
  }
}







