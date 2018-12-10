module.exports = function(app) {

    let express = require("express");
    let router = express.Router();

    const users = require('../controllers/user.controller.js');

    router.use(function (req,res,next) {
        console.log("/" + req.method);
        next();
    });

    // Save a User to MongoDB
    app.post('/signup', users.signup);
    app.post('/login', users.authentication);
    app.use("/",router);
    app.use('*', (req,res) => {
        console.log(req.path)
        res.status(404).send({msg: "Not found!"})
    })
}