//import mongoose
const mongoose = require('mongoose');

//import product model
const Product = require('../models/product');

//method to add new product
exports.addNewProduct = ((req, res, next) => {
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    //creating a new product by calling the product model's constructor
    //pass as an object which is defined in the model
    const product = new Product({ title: title, price: price, description: description, imageURL: imageURL ,userID : req.user});
    //mongoose has an inbuilt save method
    product.save()
        .then(result => {
            Product.find().then(products => {
                res.send(products);
            })
                .catch(err => console.log(err));
        })
        .catch(err => {
            console.log(err)
        });
});

//function to delete a product from database
exports.deleteProduct = ((req, res, next) => {
    const productID = req.params.prodID;
    Product.findByIdAndDelete(productID).then(product => {
        Product.find().then(products => {
            res.send(products);
        })
            .catch(err => console.log(err))
    }).catch(err => console.log(err));
});

//method to update the product stored in DB. can only be accessed by admin
exports.updateProduct = ((req, res, next) => {
    const productID = req.body._id;
    Product.findByIdAndUpdate(productID, {
        title: req.body.title,
        description: req.body.description,
        imageURL: req.body.imageURL,
        price: req.body.price
    }).then(products => {
        Product.find().then(products => {
            res.send(products);
        })
            .catch(err => console.log(err))
    })
        .catch(err => console.log(err));
});