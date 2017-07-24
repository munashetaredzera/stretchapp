const mongoose = require('mongoose'),
      Schema = mongoose.Schema

const UsersSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
})

module.exports = mongoose.model('User', UsersSchema)
