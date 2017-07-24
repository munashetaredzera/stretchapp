const express = require('express'),
      Question = require('../models/question'),
      Student =  require('../models/student'),
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

//questions get
router.get('/questions/:token', ensureToken, (req, res) => {
  Student
    .find({phoneNumber: req.body.phoneNumber})
    .exec((err, student) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else {
        Question
          .find({
            subject: req.body.subject, //Subject Id
            topic: req.body.topic,
            _id: {$nin: student.seenQuestions}
          })
          .limit(25)
          .populate('subject')
          .exec((err, questions) => {
            if (err) {
              res.send({'message': 'Error.'})
            } else {
              res.send({'message': 'Questions successfully retrieved.', 'questions': questions})
            }
          })
      }
    })
})


module.exports = router
