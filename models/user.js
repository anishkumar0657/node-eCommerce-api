//import mongoose
const mongoose = require('mongoose');

//make a schema
const Schema = mongoose.Schema;

//define the userschema
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productID: { type: Schema.Types.ObjectId, ref: 'product', required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
});

//add the product in user document in mongoDB
userSchema.methods.addToCart = function (product) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productID.toString() === product._id.toString();
    })
    let newQuantity = 1;
    const updatedCartItems = [...this.cart.items];
    if (cartProductIndex >= 0) {
        newQuantity = this.cart.items[cartProductIndex].quantity + 1;
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    }
    else {
        updatedCartItems.push({
            productID: product._id,
            quantity: newQuantity
        });
    }
    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();
};

//remove the product stored in user document in mongoDB
userSchema.methods.removeFromCart = function (productID) {
    const updatedCartItems = this.cart.items.filter(items=>{
        return items.productID.toString() !== productID.toString();
    })
    this.cart.items =updatedCartItems;
    return this.save();
};

//method to clear the cart
userSchema.methods.clearCart = function() {
    this.cart = {items:[]};
    this.save();
}

//export the schema
module.exports = mongoose.model('User', userSchema);