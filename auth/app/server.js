const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt')
const User = require('./model/user')
const jwt = require('jsonwebtoken')
dotenv.config()

const options = {
    autoIndex: false,
    reconnectTries: 100,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0
}

const connectWithRetry = () => {
    console.log('MongoDB connection with retry');
    mongoose.connect(`mongodb://aichieve-mongodb/aichieve`, options)
    .then(() => {
        console.log('MongoDB is connected')
    })
    .catch(err => {
        console.log('MongoDB connection unsuccessful');
        setTimeout(connectWithRetry, 1000)
    });
}
connectWithRetry()

var db = mongoose.connection

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/auth/register', (req, res) => {
    if (req.body.name != undefined && req.body.username != undefined && req.body.password != undefined) {
        User.findOne({ username: req.body.username })
            .then(data => {
                if (data == undefined) {
                    var user = new User({ name: req.body.name, username: req.body.username, password: bcrypt.hashSync(req.body.password, 10) })
                    user.save(err => {
                        if (err) {
                            res.send(JSON.stringify({ status: "failed", message: "failed save to db" }))
                        }
                        else {
                            res.send(JSON.stringify({ status: "success", token: jwt.sign({ username: req.body.username }, process.env.KEY) }))
                        }
                    })
                }
                else {
                    res.send(JSON.stringify({ status: "failed", message: "username already taken" }))
                }
            })
            .catch(err => {
                res.send(JSON.stringify({ status: "failed", message: ".something error on our side" }))
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
                {
                    if (data == undefined) {
                        res.send(JSON.stringify({ status: "failed", message: "username or password salah :((" }))
                    }
                    else {
                        if (bcrypt.compareSync(req.body.password, data.password)) {
                            res.send(JSON.stringify({ status: "success", token: jwt.sign({ username: req.body.username }, process.env.KEY) }))
                        }
                        else {
                            res.send(JSON.stringify({ status: "failed", message: "username or password salah :((" }))
                        }
                    }
                }
            })
            .catch(err => {
                res.send(JSON.stringify({ status: "failed", message: ".something error on our side" }))
            })
    }
    else {
        res.send(JSON.stringify({ status: "failed", message: "pliss fill all slurr :((((" }))
    }
})

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Idea app listening on http://${process.env.HOST}:${process.env.PORT}!`))
