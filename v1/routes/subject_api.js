const express = require('express'),
      Subject = require('../models/subject'),
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

//subjects get
router.get('/subjects/:token', ensureToken, (req, res) => {
  Subject
    .find({category: req.body.category, level: req.body.level})
    .exec((err, subjects) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Subject successfully retrieved.', 'subjects': subjects})
      }
    })
})

module.exports = router
