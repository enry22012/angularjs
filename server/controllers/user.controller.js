const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
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
        let salt = bcrypt.genSaltSync(saltRounds);
        let hash = bcrypt.hashSync(req.body.password, salt);
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
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
    })
    .catch(err => {
      console.log(err);
      res.status(403).send(err)
    });
};
// Authentication user
exports.authentication = (req, res) => {
  User.findOne({username: req.body.username}, function (err, user) {
    if (bcrypt.compareSync(req.body.password, user.password)) {
      const accessToken = jwt.sign({ username: user.username, role: user.role }, 'secret_key', { expiresIn: '1h' });
      User.updateOne({username: user.username}, { $set: { accessToken: accessToken }}, function (err, user) {
        if (err) throw new Error('Samething wrong');
        res.status(200).send(accessToken);
      })
    }
    else {
      console.log(`Wrong password from user: ${user.username}`);
      res.status(400);
    }
  })
};