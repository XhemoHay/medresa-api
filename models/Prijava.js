const mongoose = require("mongoose");

const PrijavaSchema = new mongoose.Schema(
     {
          prijava:{type:String, required:true},
          id:{type:String,required:true}, 
          name:{type:String,required:true},  
          lastName:{type:String,required:true},
          prof:{type:String,required:true},
     },
     {timestamps:true}
)

module.exports = mongoose.model("Prijava", PrijavaSchema);