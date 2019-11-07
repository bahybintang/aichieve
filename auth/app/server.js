const express = require('express')
const app = express()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const User = require('./model/user')
const jwt = require('jsonwebtoken')
const fs = require('fs')
const connectionString = process.env.NODE_ENV == 'dev' ? `mongodb://localhost:27017/aichieve` : `mongodb://aichieve-mongodb/aichieve`
const privateKey = fs.readFileSync('./private.pem', 'utf-8')

const options = {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
    useUnifiedTopology: true
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
                    return User({ ...req.body }).save()
                }
                else return Promise.reject(new Error("username already taken!"))
            })
            .then(() => {
                res.send(JSON.stringify({ status: "success", token: jwt.sign({ username: req.body.username }, privateKey, { algorithm: 'RS256' }) }))
            })
            .catch(err => {
                res.send({ status: "failed", message: err.toString() })
            })
    }
    else {
        res.send(JSON.stringify({ status: "failed", message: "pliss fill all slurr :((((" }))
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
        res.send(JSON.stringify({ status: "failed", message: "pliss fill all slurr :((((" }))
    }
})

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Auth app listening on http://${process.env.HOST}:${process.env.PORT}!`))
