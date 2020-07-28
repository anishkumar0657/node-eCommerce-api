const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const app = express();

const cors = require('cors');

//import shop routes
const shopRoutes = require('./routes/shop');
//import the admin route
const adminRoute = require('./routes/admin');
//import the user route
const userRoute = require('./routes/user');

//import mongoose
const mongoose = require('mongoose');

//import user model
const User = require('./models/user');

//creating a middleware with body parser to serialize/de-serialize the incoming body to the class object
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//adding a cors middleware
app.use(cors());

//adding the cors header to the responce
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use((req, res, next) => {
    User.findById('5f1c00cbe7f54057bc02e050')
        .then(user => {
            req.user = new User(user);
            next();
        })
        .catch(err => console.log(err));
});

//checking for the matching route in the user routes
app.use(userRoute);

//checking for the matching route in the shop routes
app.use(shopRoutes);

//checking for the matching route in the admin routes
app.use('/admin', adminRoute);

app.use(errorController.get404);

//using environment variable to define a port to run the service
// if no port is defined then start the service on port 3000
const port = process.env.PORT || 3000;
mongoose.connect('your connection string', { useNewUrlParser: true })
    .then(connection => {
        app.listen(port);
        console.log('listening on port : ' + port);
    })
    .catch(err => console.log(err));

