const userModel = require("../models/userModel.js");
const dotenv = require("dotenv");
dotenv.config();


class userController {
    static saveClientFields = async (req, res) => {
        try {
            const { firstName, lastName, email, selectedCountry, selectedState, selectedCity, gender, dateOfBirth, age } = req.body;


            const nameRegex = /^[a-zA-Z\s]+$/;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            // Validation check for age
            const currentYear = new Date().getFullYear();
            const minAge = 14;
            const maxAge = 99;
            const userBirthYear = currentYear - age;

            if (!firstName || !nameRegex.test(firstName)) {
                return res.status(400).json({ error: 'First name must be provided in alphabet only format' });
            } else if (!lastName || !nameRegex.test(lastName)) {
                return res.status(400).json({ error: 'last name must be provided in alphabet only format' });
            } else if (!email || !emailRegex.test(email)) {
                return res.status(400).json({ error: 'email must be provided in valid format' });
            } else if (age <= minAge || age >= maxAge || userBirthYear > currentYear) {
                return res.status(400).json({ error: 'Age must be between 14 and 99 years.' });
            }

            if (firstName && lastName && email && selectedCountry && selectedState && selectedCity && gender && dateOfBirth && age) {
                const doc = new userModel({
                    firstName, lastName, email, selectedCountry, selectedState, selectedCity, gender, dateOfBirth, age
                });

                let savedUser = await doc.save();
                console.log(savedUser);
                res.status(201).json({
                    status: "success",
                    message: "Record Saved Successfully"
                })
            } else {
                res.status(400).send({
                    status: "failed",
                    message: "All fields are required"
                });
            }
        } catch (error) {
            res.status(500).json({
                status: "failed",
                message: "Failed to save record..!!"
            })
        }
    }

    static getUserlist = async (req, res) => {
        try {
            // Fetch User data from userModel
            const userData = await userModel.find();
            res.json(userData);
        } catch (error) {
            res.status(500).json({ error: "Failed to fetch data" });
        }
    };


    // below method is just for testing purpose not the part of project
    
    static deleteAllUsers = async (req, res) => {
        try {
            const result = await userModel.deleteMany({});
            console.log('Deleted', result.deletedCount, 'users');
            res.status(200).json({ message: 'All users deleted successfully' });
        } catch (error) {
            console.error('Error deleting users:', error);
            res.status(500).json({ error: 'Failed to delte user from database' })
        }
    }
}


module.exports = userController;