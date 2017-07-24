const express = require('express'),
      Tutor = require('../models/tutor'),
      router = express.Router(),
      jwt = require('jsonwebtoken')

const ensureToken = function (req, res, next) {
  jwt.verify(req.params.token, process.env.STUDENT_SECRET_KEY, function (err, data) {
    if (err) {
      res.send({'message': 'Provide a valid token'})
    } else {
      next()
    }
  })
}

//tutors get
router.get('/tutors/:token', ensureToken, (req, res) => {
  Tutors
    .find({
      subject: req.body.subject // Subject id
    })
    .exec((err, tutors) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'tutors retrieved successfully.', 'tutors': tutors})
      }
    })
})

module.exports = router
