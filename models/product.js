//import mongoose lib
const mongoose = require('mongoose');

//create schema using mongoose
const Schema = mongoose.Schema;

//Define the schema using this template
const productSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    imageURL:{
        type:String,
        required:true
    },
    userID :{
        type: Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
});

//export the model
module.exports = mongoose.model('product',productSchema);