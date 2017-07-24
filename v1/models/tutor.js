const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const TutorSchema = new Schema({
  name: {type: String},
  email: {type: String},
  phoneNumber: {type: String, required: true, unique: true},
  subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}]
}, {strict: false})

module.exports = mongoose.model('Tutor', TutorSchema)
