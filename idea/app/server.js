const express = require('express')
const app = express()
const mongoose = require('mongoose')
const Ideas = require('./model/idea')
const User = require('./model/user')
const Request = require('./model/request')
const Offer = require('./model/offer')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const auth = require('./middleware/jwt_auth')

const connectionString = process.env.NODE_ENV == 'dev' ? `mongodb://localhost:27017/aichieve` : `mongodb://aichieve-mongodb/aichieve`

const options = {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}

mongoose.connect(connectionString, options, err => {
    if (err) console.log(err)
    else console.log("Connected to MongoDB!")
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/idea/:userID/add', auth.user, (req, res) => {
    let payload = jwt.decode(req.headers.token)
    if (req.body.title != undefined && req.body.description != undefined) {
        User.findOne({ username: req.params.userID })
            .then(data => {
                if (data == undefined) return Promise.reject(new Error("user not found!"))
                else if (res.locals.isAdmin !== true && res.userID != payload.username) return Promise.reject(new Error("You cannot add other user idea"))
                return new Ideas({ userID: req.params.userID, ...req.body }).save()
            })
            .then(data => {
                res.send({ status: "success", data })
            })
            .catch(err => {
                res.send({ status: "failed", message: err.toString() })
            })
    }
    else {
        res.send({ status: "failed", message: "Pliss fill all slurr :((" })
    }
})

app.get('/idea/get', auth.user, (req, res) => {
    var titleQ = new RegExp(escapeRegExp(req.query.title) || "", "i")
    var descriptionQ = new RegExp(escapeRegExp(req.query.description) || "", "i")
    var userIDQ = new RegExp(escapeRegExp(req.query.userID) || "", "i")
    var query = {
        $and: [
            { title: { $regex: titleQ } },
            { description: { $regex: descriptionQ } },
            { userID: { $regex: userIDQ } }
        ]
    }

    Ideas.find(query)
        .then(data => {
            res.send({ status: "success", data })
        })
        .catch(err => {
            res.send({ status: "failed", message: err.toString() })
        })
})

app.delete('/idea/:ideaID/delete', auth.user, (req, res) => {
    let payload = jwt.decode(req.headers.token)
    let query = { _id: req.params.ideaID, userID: payload.username }
    if (res.locals.isAdmin) delete query.userID

    Ideas.findOneAndDelete(query)
        .then(data => {
            if (data == undefined) return Promise.reject(new Error("ideas not found"))
            res.send({ status: "success", message: `Successfully deleted ${data.title}!` })
        })
        .catch(err => {
            res.send({ status: "failed", message: err.toString() })
        })
})

app.put('/idea/:ideaID/update', auth.user, (req, res) => {
    let payload = jwt.decode(req.headers.token)
    let query = { _id: req.params.ideaID, userID: payload.username }
    if (res.locals.isAdmin) delete query.userID

    Ideas.findOneAndUpdate(query, req.body)
        .then(data => {
            if (data == undefined) return Promise.reject(new Error("ideas not found"))
            res.send({ status: "success", message: `Successfully updated ${data.title}!` })
        })
        .catch(err => {
            res.send({ status: "failed", message: err.toString() })
        })
})

app.post('/idea/:ideaID/request', auth.user, (req, res) => {
    let payload = jwt.decode(req.headers.token)
    let query = { _id: req.body.ideaID, requesterID: payload.username }
    if (req.body.ideaID != undefined && req.body.ideaOwnerID != undefined) {
        Idea.findOne({ _id: query._id })
            .then(data => {
                if (data == undefined) return Promise.reject(new Error("idea not found!"))
                else if(data.userID == payload.username) return Promise.reject(new Error("You cannot request to join your own idea"))
                return new Request({ requesterID: query.requesterID, ideaOwnerID: data.userID, ideaID: ideaID})
            })
            .then(data => {
                res.send({ status: "success", data })
            })
            .catch(err => {
                res.send({ status: "failed", message: err.toString() })
            })
    }
    else {
        res.send({ status: "failed", message: "Pliss fill all slurr :((" })
    }
})

app.post('/idea/:ideaID/request', auth.user, (req, res) => {
    let payload = jwt.decode(req.headers.token)
    let query = { _id: req.body.ideaID, requesterID: payload.username }
    if (req.body.ideaID != undefined && req.body.ideaOwnerID != undefined) {
        Idea.findOne({ _id: query._id })
            .then(data => {
                if (data == undefined) return Promise.reject(new Error("idea not found!"))
                else if(data.userID === payload.username) return Promise.reject(new Error("You cannot request to join your own idea"))
                return new Request({ requesterID: query.requesterID, ideaOwnerID: data.userID, ideaID: query._id})
            })
            .then(data => {
                res.send({ status: "success", data })
            })
            .catch(err => {
                res.send({ status: "failed", message: err.toString() })
            })
    }
    else {
        res.send({ status: "failed", message: "Pliss fill all slurr :((" })
    }
})

app.post('/idea/:ideaID/offer', auth.user, (req, res) => {
    let payload = jwt.decode(req.headers.token)
    if (req.body.ideaID != undefined && req.body.requestedUserID != undefined) {
        Idea.findOne({ _id: query._id })
            .then(data => {
                if (data == undefined) return Promise.reject(new Error("idea not found!"))
                else if(data.userID !== payload.username) return Promise.reject(new Error("You cannot offer idea that you don't own"))
                return new Offer({ requestedUserID: req.body.requestedUserID, ideaOwnerID: data.userID, ideaID: query._id})
            })
            .then(data => {
                res.send({ status: "success", data })
            })
            .catch(err => {
                res.send({ status: "failed", message: err.toString() })
            })
    }
    else {
        res.send({ status: "failed", message: "Pliss fill all slurr :((" })
    }
})


app.listen(process.env.PORT, process.env.HOST, () => console.log(`Idea app listening on http://${process.env.HOST}:${process.env.PORT}!`))

function escapeRegExp(string) {
    if (string) return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched stringe
    else return ""
}
