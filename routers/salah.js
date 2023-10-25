const express = require('express');
const Salah1 = require('../models/Salah1');
const Student = require('../models/Students');
const { verifyToken, verifyTokenAuth, verifyTokenAndAdmin } = require('../verifyToken');
const router = express.Router();



  //////////////////         add minus for salah         ///////////////////
  router.post("/prayer1",verifyTokenAuth, async (req, res) => {
     try {
          const idArray = req.body.id;
          const salah = req.body.salah;
          const prof = req.body.prof;

          if (!salah) {
               return res.status(400).json("Select Namaz");
          }

          const findStudentsPromise = await Student.find({ _id: { $in: idArray } });
          
          const savedSalahPromises = findStudentsPromise.map(async student => {
               const name = student.name;
               const lname = student.lastName;

               const newSalah = new Salah1({ salah, id: student._id, name, lname, prof });
               const savedSalah = await newSalah.save();
               return savedSalah;
          });

          const savedSalahResults = await Promise.all(savedSalahPromises);

          res.status(200).json(savedSalahResults);
     } catch (err) {
          res.status(500).json(err);
     }
});


///Get salah for student
router.get("/prayer/:id",verifyTokenAuth, async (req, res) => {

     try {
          const salah = await Salah1.find({ id: req.params.id }).sort({ createdAt: -1 })

          res.status(200).json(salah)
     } catch (err) {
          res.status(500).json()
     }
});
//////get all salah
router.get("/prayer",verifyTokenAuth, async (req, res) => {

     try {
          const salah = await Salah1.find()

          res.status(200).json(salah)
     } catch (err) {
          res.status(500).json()
     }
});


//////////////////    Delte  salah for student  //////////

router.delete("/prayer/:id",verifyTokenAuth, async (req, res) => {

     try {
          await Salah1.findByIdAndDelete(req.params.id)
          res.status(200).json("Namaz has been deleted")
     } catch (err) {
          res.status(500).json()
     }
})

module.exports = router