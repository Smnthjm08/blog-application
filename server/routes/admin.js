const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin";
const jwtSecret = process.env.JWT_SECRET;

//check-login
const authMiddleware = (req, res, next)=>{
    const token = req.cookies.token;

    if(!token){
        res.status(404).json({ message: "Unauthorized" });
    }

    try{
        const decode = jwt.verify(token, jwtSecret);
        req.userId = decode.userId;
        next();
    } catch{
        res.status(404).json({ message: "Unauthorized" });
    }
}

//admin - login page
router.get('/admin', async (req, res) => {
  try {
    const locals = {
        title: "Admin",
        description: "Simple Blog created with NodeJs, Express & MongoDb."
      }
    res.render('admin/index', { locals, layout: adminLayout });
  } 
  catch (error) {
    console.log(error);
  }
});

//admin - check login
router.post('/admin', async (req, res) => {
      try {
        const {username, password } = req.body;

        const user = await User.findOne({username});
        if(!user){
            return res.status(401).json({message: "Invalid Credentials."})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid Credentials."})
        }

        const token = jwt.sign({userId: user._id}, jwtSecret );
        res.cookie("token", token, {httpOnly: true});
        res.redirect("/dashboard");
      } 
      catch (error) {
        console.log(error);
      }
    
    });

    //dashboard
router.get('/dashboard', authMiddleware, async (req, res) => {

    try {
        const data = await Post.find();
        res.render("/admin/dashboard", {
            locals,
        })
    } catch (error) {
        
    }
    
    
    });

// router.get('', async (req, res) => {
//   const locals = {
//     title: "NodeJs Blog",
//     description: "Simple Blog created with NodeJs, Express & MongoDb."
//   }

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });

//POST - admin register
router.post('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try{
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: "User Created!", user});
        } catch{
            if(error.code === 11000){
                res.status(409).json({ message: "User already in use"});
            }
            res.status(500).json({ message: "Internal Server Error"});
        }
    } 
    catch (error) {
      console.log(error);
    }
  });

module.exports = router;