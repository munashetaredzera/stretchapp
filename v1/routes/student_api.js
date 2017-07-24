const express = require('express'),
      router = express.Router(),
      twilio = require('twilio'),
      Student = require('../models/student'),
      jwt = require('jsonwebtoken')

function get_token(student) {
  var token = jwt.sign(student, process.env.STUDENT_SECRET_KEY, {
    expiresIn: 400000
  })
  return {'success': true, 'token': token}
}

function send_message(studentPhoneNumber, confirmationCode) {
  var accountSid = 'ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX' // Your Account SID from www.twilio.com/console
  var authToken = 'your_auth_token'   // Your Auth Token from www.twilio.com/console

  var twilio = require('twilio');
  var client = new twilio(accountSid, authToken)

  client.messages.create({
      body: 'Enter code: ' + confirmationCode.toString() + ' into stretch.',
      to: studentPhoneNumber,  // Text this number
      from: '+12345678901' // From a valid Twilio number
  })
  .then((message) => console.log(message.sid))
}

function randomCode(min,max)
{
    return Math.floor(Math.random()*(max-min+1)+min)
}

router.post('/register', (req, res) => {
  Student
    .find({phoneNumber: req.body.phoneNumber})
    .exec((err, student) => {
      if (err) {
        res.send({'message': 'Error.'})
      }
      else if (student) {
        //Send confirmation code and save code
        student.confirmationCode = randomCode(100000, 999999)
        student.save((err) => {
          if (!err) {
            res.send({'message': 'Error.'})
          } else {
            send_message(student.phoneNumber, student.confirmationCode)
            res.send({'message': 'Code sent.'})
          }
        })
      }
      else {
        //Create an account and send confirmation code plus save code
        var code = randomCode(100000, 999999)
        var newStudent = new Student({
          phoneNumber: req.body.phoneNumber,
          confirmationCode : code
        })
        newStudent.save((err) => {
          if (err) {
            res.send({'message': 'Error.'})
          } else {
            send_message(req.body.phoneNumber, code)
            res.send({'message': 'Code sent.'})
          }
        })
      }
    })
})

router.post('/confirm/registration', (req, res) => {
  Student
    .find({'phoneNumber': req.body.phoneNumber})
    .exec((err, student) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else if (parseFloat(req.body.code) == student.confirmationCode) {
        res.send({'message': 'Code confirmation successful.'})
      }
    })
})

router.post('/confirm/activation', (req, res) => {
  Student
    .find({'phoneNumber': req.body.phoneNumber})
    .exec((err, student) => {
      if (err) {
        res.send({'message': 'Error.'})
      } else if (parseFloat(req.body.code) == student.activationCode) {
          var token = get_token({'secret': student._id})
          res.send({'message': 'Activation successful.', 'token': token})
      }
    })
})

router.post('/subscribe', (req, res) => {
  Student
    .find({'phoneNumber': req.body.phoneNumber})
    .exec((err, student) => {
        if (err) {
          res.send({'message': 'Error.'})
        } else {
          //Check payment and save data here...
          //Then send activationCode
        }
    })
})

module.exports = router
