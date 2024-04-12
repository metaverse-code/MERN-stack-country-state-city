const app = require('express')();
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./config/connectdb.js");
const User = require('./models/userModel.js');
const userRoutes = require('./routes/userRoutes.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const port =  process.env.PORT || 4500;

const DATABASE_URL = process.env.DATABASE_URL;
connectDB(DATABASE_URL);

app.listen(port,()=>{
  console.log(`server listening on port ${port}`);
});

app.use("/api/users", userRoutes);

app.get('/',(req,res)=>{
  res.send({"result":"Server running..!!"});
});