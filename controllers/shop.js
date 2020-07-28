//import the product model
const Product = require('../models/product');

//import the user model
const user = require('../models/user');

//method to fetch all the product and return the Json object
exports.getAllProduct = ((req, res, next) => {
    Product.find()
        .then(products => {
            res.send(products);
        })
        .catch(err => console.log(err));
});

//function to add a product in the cart.
exports.addToCart = ((req, res, next) => {
    const productID = req.body._id;
    const product = Product.findById(productID)
        .then(product => {
            req.user.addToCart(product);
            res.send('product added to cart');
        })
        .catch(err => console.log(err));
});

//function to get the products in the cart
exports.getCartItems = ((req, res, next) => {
    req.user.populate('cart.items.productID')
        .execPopulate()
        .then(user => {
            // console.log(res);
            res.send(user.cart.items);
        })
        .catch(err => console.log(err));
});

//function to remove product from the cart.
exports.removeFromCart = ((req, res, next) => {
    const productID = req.params.prodID;
    req.user.removeFromCart(productID)
        .then(user => {
            //console.log(res);
            res.send('deleted from cart');
        })
        .catch(err => console.log(err));
});