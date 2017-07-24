const express = require('express'),
      Subject = require('../models/subject'),
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

//subjects get
router.get('/subjects/:token', ensureToken, (req, res) => {
  Subject
    .find({})
    .exec((err, subjects) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Successful', 'subjects': subjects})
      }
    })
})

//subjects post
router.post('/subjects/:token', ensureToken, (req, res) => {
  var subject = new Subject({
    name: req.body.name,
    level: req.body.level,
    category: req.body.category
  })
  subject.save((err, data) => {
    if (err) {
      res.send({'message': 'Error.'})
    } else {
      res.send({'message': 'Subject added successfully.', 'subject': data})
    }
  })
})

//subjects put
router.put('/subjects/:id/:token', ensureToken, (req, res) => {
  Subject
    .findById(req.params.id)
    .exec((err, subject) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        subject.name = req.body.name
        subject.level = req.body.level
        subject.category = req.body.category
        subject.save((err) => {
          if (err) {
            res.send({'message': 'Error.'})
          } else {
            res.send({'message': 'Subject updated'})
          }
        })

      }
    })
})

//subjects delete
router.delete('/subjects/:id/:token', ensureToken, (req, res) => {
  Subject
    .remove({_id: req.params.id}, (err) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Subject deleted.'})
      }
    })
})

module.exports = router
