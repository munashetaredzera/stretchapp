const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const NoteSchema = new Schema({
  image: String,
  note: {type: String, required: true}
})

const NotesSchema = new Schema({
  title: {type: String, required: true},
  subject: {type: mongoose.Schema.Types.ObjectId, ref:'Subject', required: true},
  topic: {type: String, required: true},
  note: NoteSchema
}, {strict: false})

module.exports = mongoose.model('Notes', NotesSchema)
