const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop');

const router = express.Router();

//calling the controller to return all the product in the database
router.get('/getAllProducts', shopController.getAllProduct);

//add to cart handler
router.post('/addToCart',shopController.addToCart);

//fetching cart item route
router.get('/getCartItems', shopController.getCartItems);

router.delete('/removeFromCart/:prodID',shopController.removeFromCart);

module.exports = router;
