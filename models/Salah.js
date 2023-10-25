const mongoose = require("mongoose");

const SalahSchema = new mongoose.Schema(
     {
          salah:{type:String, required:true},
          id:{type:Array,required:true},  
          name:{type:Array,required:true},    
          lastName:{type:Array,required:true},
          prof:{type:String,required:true},       
     },
     {timestamps:true}
)

module.exports = mongoose.model("Salah", SalahSchema);