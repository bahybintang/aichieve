const mongoose = require('mongoose')

var ideaSchema = new mongoose.Schema({
    userID: { type: String, required: true },
    id: {
        type: mongoose.Schema.Types.ObjectId,
        index: true,
        required: true,
        auto: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true }
})
var Ideas = mongoose.model('Ideas', ideaSchema)

module.exports = Ideas