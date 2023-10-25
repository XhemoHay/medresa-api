const express = require('express');
const Klasat = require('../models/Klasat')
const { verifyToken, verifyTokenAuth, verifyTokenAndAdmin } = require('../verifyToken');
const router = express.Router();


////    Profesoosrs   ////
router.post("/",verifyTokenAndAdmin, async(req,res)=>{
      const newClass1 =  req.body.newclass.name;
 
     try{
      const existingClass = await Klasat.findOne({ name: newClass1});
 
      if (existingClass) {
        // Class already exists, return an error response
        return res.status(400).json({ message: 'Class already exists' });
      }

      const newClass = new Klasat(req.body.newclass);

      const savedStudent = await newClass.save();
      res.status(200).json(savedStudent)
     }catch(err){
      res.status(500).json(err)

     }
})

router.get("/",verifyTokenAuth, async (req, res) => {
  try {
       const getClasses = await Klasat.find().sort({name:1})
       res.status(200).json(getClasses)

  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete("/:id",verifyTokenAndAdmin, async(req, res) =>{
  try{
      const deleteClass = await Klasat.findByIdAndDelete(req.params.id)
      res.status(200).json(deleteClass)
  }catch(err){
    res.status(500).json(err)
  }
})




module.exports = router