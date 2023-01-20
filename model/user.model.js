const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
  Name:String,
  Email:String,
  Age:Number,
  Pass:String
 

});

const userModel=mongoose.model("userdata",userSchema);
module.exports={
    userModel
}