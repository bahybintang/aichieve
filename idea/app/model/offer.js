const mongoose = require('mongoose')

var offerSchema = new mongoose.Schema({
    requestedUserID: { type: String, required: true },
    ideaOwnerID: { type: String, required: true },
    ideaID: { type: String, required: true },
})
var Offers = mongoose.model('Offers', offerSchema)

module.exports = Offers