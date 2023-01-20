const express = require("express");
const { connection } = require("./config/db");
const {Userroute}=require("./routes/user.route")
const {Productroute}=require("./routes/products.routes")
const cors=require("cors")
require('dotenv').config();
const app = express();

app.use(cors({
  origin:"*"
}));

app.use(express.json())
app.use("/user",Userroute)
app.use("/product",Productroute)


app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("Data base connected");
  } catch (err) {
    console.log("Data base is not connected");
    console.log(err);
  }
  console.log(`server is running on ${process.env.port}`)
});
