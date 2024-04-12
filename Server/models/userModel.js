const mongoose = require('mongoose');

const userSchema= new mongoose.Schema({
    firstName: String,
    lastName:String,
    email: String,
    selectedCountry:String,
    selectedState: String,
    selectedCity: String,
    gender:String,
    dateOfBirth:String,
    age:Number,
});
module.exports = mongoose.model('userList', userSchema);