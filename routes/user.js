//import the user controller
const userController = require('../controllers/user');

//import express
const express = require('express');

//use router from express
const router = express.Router();

//define the route
router.post('/addNewUser',userController.addUser);

//export the router
module.exports = router;