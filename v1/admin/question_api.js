const express = require('express'),
      Question = require('../models/question'),
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

//get questions
router.get('/questions/:token', ensureToken, (req, res) => {
  Question
    .find()
    .populate('subject')
    .exec((err, questions) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Successful', 'questions': questions})
      }
    })
})

//questions post
router.post('/questions/:token', ensureToken, (req, res) => {
  var question = new Question({
    question: req.body.question,
    answers: req.body.answers, // Array of objects answers
    topic: req.body.topic,
    subject:req.body.subject,// Subject Id
    explanation: req.body.explanation // Array of {ans: String, explanation: String}
  })
  console.log(question)
  question.save((err) => {
    if (err) {
      res.send({'message': 'Error.'})
    } else {
      res.send({'message': 'Question successfully saved.'})
    }
  })
})

//questions put
router.put('/questions/:id/:token', ensureToken, (req, res) => {
  Question
    .findById(req.params.id)
    .exec((err, doc) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        doc.question = req.body.question
        doc.answers = req.body.answers // Array of objects answers
        doc.topic = req.body.topic
        doc.subject = req.body.subject // Subject Id
        doc.explanation = req.body.explanation
        console.log(doc)
        doc.save((err) => {
          if (err) {
            res.send({'message': 'Error.'})
          } else {
            res.send({'message': 'Question updated.'})
          }
        })
      }
    })
})

//questions delete
router.delete('/questions/:id/:token', ensureToken, (req, res) => {
  Question
    .remove({_id: req.params.id}, (err) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        res.send({'message': 'Question deleted successfully.'})
      }
    })
})

module.exports = router
