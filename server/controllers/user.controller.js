const User = require('../models/user.model.js');
//Registration user
exports.signup = (req, res) => {
    let role = 'sys_admin';
    User.find()
        .then(users => {
            if (users.some(function(user) { return user.username === req.body.username})){
                console.log("Collisionuser");
                throw new Error("Username is already taken!");
            }
            else {
                if (users.length !== 0){
                    role = 'user';
                }
                const user = new User({
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    role: role,
                    accessToken: '',
                    refreshToken: ''
                });
                user.save()
                    .then(data => {
                        console.log(`User: ${user.username} - add!`)
                        res.send(data);
                    }).catch(err => {
                        res.status(500).send({msg: err})
                    });
            }
    }).catch(err => {
        console.log(err);
        res.status(403).send(err)
    });
};
// Authentication user
exports.authentication = (req, res) => {
    User.findOne({username: req.body.username}, function (err, user) {
        console.log(user);
        res.status(200).send(user);
    })
}


// Save FormData - User to MongoDB
exports.save = (req, res) => {
    console.log('Post a User: ' + JSON.stringify(req.body));

    // Create a Customer
    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname
    });

    // Save a Customer in the MongoDB
    user.save()
        .then(data => {
        res.send(data);
}).catch(err => {
        res.status(500).send({
        message: err.message
    });
});
};

// Fetch all Users
exports.findAll = (req, res) =>  {
    console.log("Fetch all Users");

    User.find()
        .then(users => {
        res.send(users);
}).catch(err => {
        res.status(500).send({
        message: err.message
    });
});
};