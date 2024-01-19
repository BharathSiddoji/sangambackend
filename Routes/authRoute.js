const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const router = express.Router()

const User = require('../Models/userModel.js')
const createToken = require('../utills/createToken.js')
router.post('/signup',async(req,res)=>{

    try {
        const { email, password, name, createdAt } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.json({ message: "User already exists" });
        }
        const user = await User.create({ email, password, name, createdAt });
        const token = createToken(user._id);
        res.cookie('sangamToken', token, {
          httpOnly: true, // The cookie is only accessible by the server
          secure: true, // The cookie will only be sent over HTTPS
          sameSite: 'none', // The cookie will be sent with both same-site and cross-site requests
          maxAge: 24 * 60 * 60 * 1000 // The cookie will expire in 1 day
        });
        res
          .status(201)
          .json({ message: "User signed in successfully", success: true });
        
      } catch (error) {
        console.error(error);
      }
})
router.post('/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        if(!email || !password ){
          return res.json({message:'All fields are required'})
        }
        const user = await User.findOne({ email });
        if(!user){
          return res.json({message:'Incorrect password or email' }) 
        }
        const auth = await bcrypt.compare(password,user.password)
        if (!auth) {
          return res.json({message:'Incorrect password or email' }) 
        }
         const token = createToken(user._id);
         res.cookie("sangamToken", token, {
           withCredentials: true,
           httpOnly: false,
           secure:true,
           sameSite: 'none'
         });
         res.status(201).json({ message: "User logged in successfully", success: true });
         
      } catch (error) {
        console.error(error);
      }
    

})
module.exports = router