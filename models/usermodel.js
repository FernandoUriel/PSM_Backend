const mongoose = require('mongoose'),
  bcrypt = require('bcrypt'),
  Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },

})

UserSchema.methods.isValidPassword = function(password, cb) {
  return cb(this.password === password ? true : false)
  
}

const UserModel = mongoose.model('accounts', UserSchema)

module.exports = UserModel
