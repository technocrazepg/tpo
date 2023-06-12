const express = require('express');
const Users = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')


// ROUTE 1: Create new User sign up
router.post('/signup',[
    body('fname',"Name must have a length of at least 3 characters").isLength({min: 3}),
    body('email',"Enter a valid email").isEmail(),
    body('password',"Password must have a length of at least 6 characters").isLength({min: 6})
] , async (req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    // check if already exist
    const {fname, lname, email, password} = req.body;
    let user = await Users.findOne({email: email});
    if(user){
      return res.status(400).json({error: "An account with this email already exists"});
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const secPasswd = await bcrypt.hash(password, salt)
      user = await Users.create({
        fname: fname,
        lname: lname,
        password: secPasswd,
        email: email
    })
      res.json(user);
      //console.log(user)
    } catch (error) {
      req.status(500).json({error:"Some Internal Server Error !!"});
    }
})

// ROUTE2: user login
router.post('/login',[
  body('email',"Enter a valid email").isEmail(),
  body('password',"Password must have a length of at least 6 characters").isLength({min: 5})
] , async (req,res)=>{
  // console.log(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {email, password} = req.body;
    let user = await Users.findOne({email: email});
    //console.log(user);
    if(!user){
      return res.status(400).json({error: "User doesn't exists"});
    }
    const pswd = await bcrypt.compare(password, user.password);
    if(!pswd){
      return res.status(400).json({error: "Incorrect Credentials"});
    }
    // if(password !== user.password){
    //   return res.status(400).json({error:"Incorrect passwrod"});
    // }
    const payload = {
      userdata:{
        id: user.id
      }
    }
    const authToken = jwt.sign(payload, JWT_SECRET);
    // console.log(authToken);
    res.json({authToken});  // sends an authorised token to login API called in login.js
    // res.json({user, pswd});

  } catch (error) {
    console.log(error);
    res.status(500).send("Some Internal server error !");
  }
})

// ROUTE3 : get user details
router.post('/getuserdetails',fetchuser, async (req,res)=>{
  try {
    const userId = req.userdatafromjwt.id;
    const user = await Users.findById(userId);
    res.send(user);
  } catch (error) {
    console.error(error.message)
    res.status(500).json({error:"Some Internal server error !"});
  }
})

// ROUTE4: Update user
router.put('/update',[
  body('phone',"Enter a valid mobile phone number").isMobilePhone(),
  body('address',"Address must have a length of at least 7 characters").isLength({min: 7})
] ,async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const updateduser = req.body;
    let user = await Users.findOneAndUpdate({'email':updateduser.email},{$set:updateduser});
    console.log("Successfully updated !!");
    if(!user){
      return res.status(400).json({error: "User doesn't exists"});
    }

    res.json({msg: "Updated Successfully !!"});
  } catch (error) {
    console.log(error);
    res.status(500).send("Some Internal server error !");
  }
})

module.exports = router
