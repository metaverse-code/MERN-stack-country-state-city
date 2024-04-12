const mongoose = require("mongoose");
const UserModel = require("../models/userModel.js");


const connectDB =async (DATABASE_URL)=>{
    try {
        const DB_OPTIONS={
            dbName: 'FrequentResearchDB'
        }
        await mongoose.connect(DATABASE_URL, DB_OPTIONS);
        console.log("Connected Successfully..!!")
    } catch (error) {
        console.log(error);
    }
}

module.exports = connectDB;