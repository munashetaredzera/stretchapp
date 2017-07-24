const express = require('express'),
      Tutor = require('../models/tutor'),
      router = express.Router(),
      jwt = require('jsonwebtoken')

const ensureToken = function (req, res, next) {
  jwt.verify(req.params.token, process.env.ADMIN_SECRET_KEY, function (err, data) {
    if (err) {
      res.send({'message': 'Provide a valid token'})
    } else {
      next()
    }
  })
}

//tutors get
router.get('/tutors/:token', ensureToken, (req, res) => {
  Tutor
    .find({})
    .populate('subjects')
    .exec((err, tutors) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Successful', 'tutors': tutors})
      }
    })
})

//tutors post
router.post('/tutors/:token', ensureToken, (req, res) => {
  var tutor = new Tutor({
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    subjects: req.body.subjects // list of Subject ids
  })
  tutor.save((err, data) => {
    if (err) {
      res.send({'message': 'Error.'})
    } else {
      res.send({'message': 'tutors saved. succefully.', 'tutor': data})
    }
  })
})

//tutors put
router.put('/tutors/:id/:token', ensureToken, (req, res) => {
  Tutor
    .findById(req.params.id)
    .exec((err, tutor) => {
      tutor.name = req.body.name
      tutor.subjects = req.body.subjects // list of Subject ids
      tutor.email = req.body.email
      tutor.phoneNumber =  req.body.phoneNumber
      tutor.save((err) => {
        if (err) {
          res.send({'message': 'Error.'})
        } else {
          res.send({'message': 'Tutor updated.'})
        }
      })
    })
})

//tutors delete
router.delete('/tutors/:id/:token', ensureToken, (req, res) => {
  Tutor
    .remove({_id: req.params.id})
    .exec((err) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Tutor deleted.'})
      }
    })
})

module.exports = router
