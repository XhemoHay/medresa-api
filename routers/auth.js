const express = require('express');
const router = express.Router();
const User = require("../models/User")
const CryptoJS =  require("crypto-js");
const jwt = require("jsonwebtoken")
const {verifyTokenAndAdmin} = require("../verifyToken")



////////////////////   Register   ///////////////////////////////

router.post("/register", verifyTokenAndAdmin, async (req, res)=>{
 
   const newUser = new User({
     username:req.body.newUser.name,
     password: CryptoJS.AES.encrypt(req.body.newUser.password, process.env.PASS_SEC).toString(),
     type:req.body.newUser.type
   });
   try{
      const savedUser = await newUser.save()
      res.status(201).json(savedUser)
   }catch(err){
     res.status(500).json()
   }
})


////////////////////   Login     //////////////////////

router.post("/login", async(req, res) =>{
  try{

    const user = await User.findOne({username:req.body.username});
    if(!user) {return res.status(400).json("Wrong username")};
    
    const hashedPass = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

    const password1 = hashedPass.toString(CryptoJS.enc.Utf8);
    if(password1 !==req.body.password) {return res.status(400).json("Wrong password")};

     const accessToken = jwt.sign({
       id:user._id,
       isAdmin: user.isAdmin,
     },process.env.JTW_SEC, {expiresIn:"5d"});

    const {password, ...others} = user._doc;
    res.status(200).json({...others ,accessToken})
  }catch(err){
       res.status(500).json()
  }
})



router.get("/", verifyTokenAndAdmin, async (req, res) => {

  try {
       const getUsers = await User.find().sort({name:1})
       res.status(200).json(getUsers)

  } catch (err) {
    res.status(500).json(err)
  }
})


router.delete("/:id",verifyTokenAndAdmin, async(req, res) =>{
  try{
      const deleteUser = await User.findByIdAndDelete(req.params.id)
      res.status(200).json(deleteUser)
  }catch(err){
    res.status(500).json(err)
  }
})



module.exports = router