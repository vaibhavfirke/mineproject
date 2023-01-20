const express = require("express");
const { productModel } = require("../model/product.model");
const Productroute = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();
const { authenticate } = require("../middlevare/authenticate.middleware");

Productroute.get("/", authenticate, async (req, res) => {
  const userid=req.body.userID
  try {
    const data = await productModel.find({userID:userid});
    res.send(data);
  } catch (err) {
    res.sned("data not found");
    console.log(err);
  }


});

Productroute.post("/create",authenticate, async (req, res) => {
  const data = req.body;
  var token = req.headers.authorization;
  try {
    const prod = new productModel(data);
    await prod.save();
    res.send("Product created");
  } catch (err) {
    res.sned("Product not created");
    console.log(err);
  }
  // jwt.verify(token, process.env.key, async (err, decode) => {
  //   if (err) {
  //     res.send("Login again");
  //     console.log(err);
  //   } else {
  //     try {
  //       const prod = new productModel(data);
  //       await prod.save();
  //       res.send("Product created");
  //     } catch (err) {
  //       res.sned("Product not created");
  //       console.log(err);
  //     }
  //   }
  // });
});

Productroute.patch("/update/:id", authenticate,async (req, res) => {
  const Id = req.params.id;
  const pay = req.body;
  
  const prod=await productModel.findOne({_id:Id});
  const user_id_in_prod=prod.userID;
  const user_making_req=req.body.userID;
  try {
    if(user_id_in_prod!==user_making_req){
      res.send({"msg":"you are not authorised to do this "})
    }else{

      await productModel.findByIdAndUpdate({ _id: Id }, pay);
      res.send(`Product data updated with id : ${Id}`);
    }
  } catch (err) {
    res.send("con not update this items ");
    console.log(err);
  }
 
});

Productroute.delete("/remove/:id",authenticate, async (req, res) => {
  const Id = req.params.id;
  const prod=await productModel.findOne({_id:Id});
  const user_id_in_prod=prod.userID;
  const user_making_req=req.body.userID;
  try {
    if(user_id_in_prod!==user_making_req){
      res.send({"msg":"you are not authorised to do this opration"})
    }else{
      await productModel.findByIdAndDelete({ _id: Id });
      res.send(`Product data deleted with id : ${Id}`);

    }
  } catch (err) {
    res.send("con not delete this items ");
    console.log(err);
  }
});

module.exports = { Productroute };
