const express =require("express");
const router = express.Router();
const userController = require("../controllers/userController.js");

//Public Routes 
router.post('/save-user', userController.saveClientFields); 
router.get('/getuserlist', userController.getUserlist); 
router.delete('/deleteAllUsers', userController.deleteAllUsers); 

module.exports = router;