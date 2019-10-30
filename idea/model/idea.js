const mongoose = require('mongoose')

var ideaSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true }
})
var Ideas = mongoose.model('Ideas', ideaSchema)

module.exports = Ideas