
const express = require("express");
const { userModel } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require('dotenv').config();
const Userroute=express.Router()
Userroute.post("/signup", async (req, res) => {
    const { Name, Email, Age, Pass } = req.body;
    const userData=await userModel.find({Email});
    if(userData.length==0){
      try {
          bcrypt.hash(Pass, 8, async (err, hash) => {
            const user = new userModel({ Name, Email, Age, Pass: hash });
            await user.save();
            res.send("Registered");
          });
        } catch (err) {
          res.send("user not created");
          console.log(err);
        }
    }else{
      res.send("Email all ready exists go to Login")
    }
    
  });
  
  Userroute.post("/login", async (req, res) => {
    const { Email, Pass } = req.body;
    
  
    try {
      const user = await userModel.find({ Email });
     const login_user_Id=user[0]._id
     
      if (user.length > 0) {
        bcrypt.compare(Pass, user[0].Pass, function (err, result) {
          if (result) {
            const token = jwt.sign({ course: login_user_Id }, process.env.key);
            res.send({ msg: "Login successfull", token: token });
          } else {
            res.send("Wrong credentials");
          }
        });
      } else {
        res.send("Check Email and Pass or Creaate new one");
      }
    } catch (err) {
      res.sned("user not found with this email");
      console.log(err);
    }
  });

  module.exports = { Userroute };