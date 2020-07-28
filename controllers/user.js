//import the user model
const User = require('../models/user');

//method to add user
const addUser = ((req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const cart = req.body.cart;
    const user = new User({ name: name, email: email, cart: cart });
    user.save().then(user => {
        console.log(user);
        res.send('user added');
    }).catch(err => console.log(err));
});

//export the methods
exports.addUser = addUser;