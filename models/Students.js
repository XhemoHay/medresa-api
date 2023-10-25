const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
     {
          name:{type:String, required:true},
          lastName:{type:String, required:true},
          class:{type:String,  default:""},
          // professor:{type:String, default:""},          
     },
     {timestamps:true}
)

module.exports = mongoose.model("Student", StudentSchema);