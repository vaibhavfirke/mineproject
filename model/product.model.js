const mongoose=require('mongoose');
const productSchema=mongoose.Schema({
    Title:String,
    Cat:String,
    Price:Number,
    userID:String,

});

const productModel=mongoose.model("productdata",productSchema);
module.exports={
    productModel
}