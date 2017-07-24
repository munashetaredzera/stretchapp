const express = require('express'),
      Notes = require('../models/notes'),
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

//notes get
router.get('/notes/:token', ensureToken, (req, res) => {
  Notes
    .find({
      subject: req.body.subject // Subject id
    })
    .exec((err, notes) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Notes retrieved successfully.', 'notes': notes})
      }
    })
})

module.exports = router
