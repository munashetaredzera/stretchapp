const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const QuestionSchema = new Schema({
  question: {type: String, required: true, unique: true},
  answers: [],
  topic: String,
  subject: {type: mongoose.Schema.Types.ObjectId, ref: 'Subject'},
  createdOn: {type: Date, default: Date.now},
  explanation: String
}, {strict: false})

module.exports = mongoose.model('Question', QuestionSchema)
