const mongoose = require('mongoose')

var userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }
})
var Users = mongoose.model('Users', userSchema)

module.exports = Users