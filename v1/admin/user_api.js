const express = require('express'),
      User = require('../models/user'),
      router = express.Router(),
      jwt = require('jsonwebtoken'),
      bcrypt = require('bcrypt')

function get_token(user) {
  var token = jwt.sign(user, process.env.ADMIN_SECRET_KEY, {
    expiresIn: 400000
  })
  return {'success': true, 'token': token}
}

router.post('/register', (req, res) => {
  let hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10))
  let user =  new User({
    name: req.body.name,
    email: req.body.email,
    password: hash
  })
  user.save((err) => {
    if (err) {
      res.send({'message': 'Error.'})
    } else {
      var token = get_token({'secret': user._id})
      res.send({'message': 'Successful', 'token': token})
    }
  })
})

router.post('/login', (req, res) => {
  User
    .findOne({email: req.body.email})
    .exec((err, user) => {
      if (!user) {
        res.send({'message': 'Invalid email or password.'})
      } else {
        if (bcrypt.compareSync(req.body.password, user.password)) {
          var token = get_token({'secret': user._id})
          res.send({'message': 'Successful', 'token': token})
        } else {
          res.send({'message': 'Invalid password.'})
        }
      }
    })
})

module.exports = router
