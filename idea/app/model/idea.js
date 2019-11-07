const mongoose = require('mongoose')

var ideaSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    skills_required: [ String ],
    status: { type: String },
    collaboration_pages: { type: String },
    joined_user: [ String ]
})
var Ideas = mongoose.model('Ideas', ideaSchema)

module.exports = Ideas