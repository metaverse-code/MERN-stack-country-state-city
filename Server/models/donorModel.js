const mongoose = require('mongoose');

const donorSchema= new mongoose.Schema({
    name: String,
    phone:String,
    email: String,
    address:String,
    amount: Number,
    panNum: String,
    purpose:Array,
});

module.exports = mongoose.model('donorList', donorSchema);