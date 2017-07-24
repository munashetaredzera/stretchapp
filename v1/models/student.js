const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const SubscrptionSchema = new Schema({
  amount: Number,
  currency: String,
  paidOn: {type: Date, default: Date.now},
  expiresOn: Date
})

const StudentSchema = new Schema({
  phoneNumber: {type: String, required: true, unique: true},
  name: {type: String},
  handset: {},
  isA: {type: String, default: 'Student'},
  createdOn: Date,
  lastModifiedOn: {type: Date, default: Date.now},
  confirmationCode: Number,
  activationCode: Number,
  subscription: [SubscrptionSchema],
  seenQuestions: [String] //Questions Ids
}, {strict: false})

module.exports = mongoose.model('Student', StudentSchema)
