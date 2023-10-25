const express = require('express');
const Student = require('../models/Students');
const Salah = require('../models/Salah');
const Salah1 = require('../models/Salah1');
const Prijava = require('../models/Prijava');
const { verifyTokenAuth } = require('../verifyToken');
const router = express.Router();



//CREATE
router.post("/",verifyTokenAuth, async (req, res) => {
     const newStudent = new Student(req.body);

     try {
          const savedStudent = await newStudent.save();
          res.status(200).json(savedStudent)
     } catch (err) {
          res.status(500).json(err)

     }
})




///Create Prijava
router.post("/prijava",verifyTokenAuth, async (req, res) => {

     const newPrijava = new Prijava(req.body);
 
     try {
          const savedPrijava = await newPrijava.save();
          res.status(200).json(savedPrijava)
     } catch (err) {
          res.status(500).json(err)

     }
})



////Get Prijava
router.get("/prijava/:id",verifyTokenAuth, async (req, res) => {

     try {
          const prijava = await Prijava.find({ id: req.params.id }).sort({ createdAt: -1 })

          res.status(200).json(prijava)
     } catch (err) {
          res.status(500).json()
     }
});


///// get all izjava
router.get("/prijava",verifyTokenAuth, async (req, res) => {

     try {
          const prijava = await Prijava.find()
          res.status(200).json(prijava)
     } catch (err) {
          res.status(500).json()
     }
});

router.delete("/prijava/:id",verifyTokenAuth, async (req, res) => {
     try {
          await Prijava.findByIdAndDelete(req.params.id)
          res.status(200).json("Izjava has been deleted")
     } catch (err) {
          res.status(500).json()
     }
})




//UPDATE
router.put("/:id",verifyTokenAuth, async (req, res) => {

     try {
          const updatedStudent = await Student.findByIdAndUpdate(req.params.id, {
               $set: req.body
          }, { new: true });
          res.status(200).json(updatedStudent)

     } catch (err) { res.status(500).json(err) }
})


//DELETE
router.delete("/:id",verifyTokenAuth, async (req, res) => {
     try {
          await Student.findByIdAndDelete(req.params.id)
          res.status(200).json("Student has been deleted")
     } catch (err) {
          res.status(500).json()
     }
})

//GET Student
router.get("/find/:id",verifyTokenAuth, async (req, res) => {
     try {
          const student = await Student.findById(req.params.id)

          res.status(200).json(student)
     } catch (err) {
          res.status(500).json()
     }
});

//GET Student by name
router.post("/search",verifyTokenAuth, async (req, res) => {
     const name = req.body.searchName

     try {
          const student = await Student.findOne({ name })
          console.log(student);
          res.status(200).json(student)
     } catch (err) {
          res.status(500).json(err)
     }
});

// GET ALL Students
router.get("/",verifyTokenAuth, async (req, res) => {
     const qNew = req.query.new;
     const qCategory = req.query.category;

     try {
          let students;
          if (qNew) {
               students = await Student.find().sort({ createdAt: -1 }).limit(5);
          } else if (qCategory) {
               students = await Student.find({ class: { $in: [qCategory], } })
          } else {
               students = await Student.find()
          }


          res.status(200).json(students)
     } catch (err) {
          res.status(500).json(err)
     }
});




module.exports = router