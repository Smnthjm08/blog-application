const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const User = require("../models/User");
const Bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminLayout = "../views/layouts/admin"

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

//POST - admin
router.post('/admin', async (req, res) => {
    try {
        const {username, password} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        try{
            const user = await User.create({ username, password: hashedPassword });
            res.status(201).json({ message: "User Created!", user});
        } catch{
            if(error.code = 11000){
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