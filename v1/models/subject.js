const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const SubjectSchema = new Schema({
  name: String,
  level: {type: String, default: 'Grade 7'},
  category: {type: String, default: 'ZIMSEC'} // Or Campridge
}, {strict: false})

module.exports = mongoose.model('Subject', SubjectSchema)
