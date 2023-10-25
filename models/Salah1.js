const mongoose = require("mongoose");

const Salah1Schema = new mongoose.Schema(
     {
          salah:{type:String, required:true},
          id:{type:String, required:true}, 
          name:{type:String, required:true},  
          lname:{type:String, required:true},   
          prof:{type:String,required:true},       
     },
     {timestamps:true}
)

module.exports = mongoose.model("Salah1", Salah1Schema);