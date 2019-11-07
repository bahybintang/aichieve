const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const User = require('./model/user')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const auth = require('./middleware/jwt_auth')
const connectionString = process.env.NODE_ENV == 'dev' ? `mongodb://localhost:27017/aichieve` : `mongodb://aichieve-mongodb/aichieve`
const privateKey = fs.readFileSync('./private.pem', 'utf-8')

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

app.post('/auth/register', (req, res) => {
    console.log(req.body)
    if (req.body.name != undefined && req.body.username != undefined && req.body.password != undefined) {
        User.findOne({ username: req.body.username })
            .then(data => {
                if (data == undefined) {
                    req.body.password = bcrypt.hashSync(req.body.password, 10)
                    delete req.body.role
                    return User({ ...req.body }).save()
                }
                else return Promise.reject(new Error("username already taken!"))
            })
            .then(() => {
                res.send({ status: "success", token: jwt.sign({ username: req.body.username }, privateKey, { algorithm: 'RS256' }) })
            })
            .catch(err => {
                res.send({ status: "failed", message: err.toString() })
            })
    }
    else {
        res.send({ status: "failed", message: "pliss fill all slurr :((((" })
    }
})

app.post('/auth/login', (req, res) => {
    if (req.body.username != undefined && req.body.password != undefined) {
        User.findOne({ username: req.body.username })
            .then(data => {
                if (data == undefined) return Promise.reject(new Error("username or password wrong!"))
                else if (bcrypt.compareSync(req.body.password, data.password)) return Promise.resolve(data)
                else return Promise.reject(new Error("username or password wrong!"))
            })
            .then(data => {
                res.send({ status: "success", token: jwt.sign({ username: data.username }, privateKey, { algorithm: 'RS256' }) })
            })
            .catch(err => {
                res.send({ status: "failed", message: err.toString() })
            })
    }
    else {
        res.send({ status: "failed", message: "pliss fill all slurr :((((" })
    }
})

app.delete('/users/:userID/delete', auth.admin, (req, res) => {
    let query = { username: req.params.userID }
    User.findOneAndDelete(query)
        .then(data => {
            if (data == undefined) return Promise.reject(new Error("User not found"))
            res.send({ status: "success", message: `Successfully deleted ${data.username}!` })
        })
        .catch(err => {
            res.send({ status: "failed", message: err.toString() })
        })
})

app.put('/users/:userID/update', auth.user, (req, res) => {
    let payload = jwt.decode(req.headers.token)
    let query = { username: req.params.userID }
    delete req.body.username
    delete req.body.role
    if (req.body.password != undefined) req.body.password = bcrypt.hashSync(req.body.password, 10)

    User.findOneAndUpdate(query, req.body)
        .then(data => {
            if (data == undefined) return Promise.reject(new Error("User not found"))
            else if (res.locals.isAdmin !== true && data.username != payload.username) return Promise.reject(new Error("You cannot update other user"))
            res.send({ status: "success", message: `Successfully updated ${data.username}!` })
        })
        .catch(err => {
            res.send({ status: "failed", message: err.toString() })
        })
})

app.get('/users', auth.user, (req, res) => {
    var idea, skill
    try {
        idea = JSON.parse(req.query.joined_idea)
    } catch (err) {
        idea = []
    }

    try {
        skill = JSON.parse(req.query.skills)
    } catch (err) {
        skill = [""]
    }
    var query = {
        $and: [
            { username: { $regex: new RegExp(escapeRegExp(req.query.username) || "", "i") } },
            { name: { $regex: new RegExp(escapeRegExp(req.query.name) || "", "i") } },
            { role: { $regex: new RegExp(escapeRegExp(req.query.role) || "", "i") } },
            { bio: { $regex: new RegExp(escapeRegExp(req.query.bio) || "", "i") } },
            { $or: skill.map(val => { return { skills: { $regex: new RegExp(escapeRegExp(val) || "", "i") } } }) },
            { $or: idea.map(val => { return { joined_idea: val } }) }
        ]
    }

    User.find(query)
        .then(data => {
            res.send({ status: "success", data })
        })
        .catch(err => {
            console.log(err)
            res.send({ status: "failed", message: err.toString() })
        })
})

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Auth app listening on http://${process.env.HOST}:${process.env.PORT}!`))


function escapeRegExp(string) {
    if (string) return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched stringe
    else return ""
}
