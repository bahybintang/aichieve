const mongoose = require('mongoose')

var requestSchema = new mongoose.Schema({
    requesterID: { type: String, required: true },
    ideaOwnerID: { type: String, required: true },
    ideaID: { type: String, required: true },
})
var Requests = mongoose.model('Requests', requestSchema)

module.exports = Requests