const express = require('express'),
      Notes = require('../models/notes'),
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

//notes get
router.get('/notes/:token', ensureToken, (req, res) => {
  Notes
    .find({})
    .populate('subject')
    .exec((err, notes) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Successful', 'notes': notes})
      }
    })
})

//notes post
router.post('/notes/:token', ensureToken, (req, res) => {
  var notes = new Notes({
    title: req.body.title,
    subject: req.body.subject, //Subject id
    topic: req.body.topic,
    note: req.body.note //Note is an array of {image: String, note: {type: String, required: true}}
  })
  notes.save((err) => {
    if (err) {
      res.send({'message': 'Error.'})
    } else {
      res.send({'message': 'Notes saved succefully.'})
    }
  })
})

//notes put
router.put('/notes/:id/:token', ensureToken, (req, res) => {
  Notes
    .findById(req.params.id)
    .exec((err, notes) => {
      notes.title = req.body.title
      notes.subject = req.body.subject // Subject id
      notes.topic = req.body.topic
      notes.note =  req.body.note // Array of {image: String, note: {type: String, required: true}}
      notes.save((err) => {
        if (err) {
          res.send({'message': 'Error.'})
        } else {
          res.send({'message': 'Notes updated.'})
        }
      })
    })
})

//notes delete
router.delete('/notes/:id/:token', ensureToken, (req, res) => {
  Notes
    .remove({_id: req.params.id})
    .exec((err) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Notes deleted.'})
      }
    })
})

module.exports = router
