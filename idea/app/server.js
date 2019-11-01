const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Ideas = require('./model/idea')
const User = require('./model/user')
const bodyParser = require('body-parser')
dotenv.config()

const options = {
    autoIndex: false,
    reconnectTries: 100,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0
}

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect(`mongodb://aichieve-mongodb:27017/aichieve`, options)
    .then(() => {
        console.log('MongoDB is connected')
    })
    .catch(err => {
        console.log('MongoDB connection unsuccessful')
        setTimeout(connectWithRetry, 1000)
    });
}
connectWithRetry()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/idea/:userID/add', (req, res) => {
    if (req.body.title != undefined && req.body.description != undefined) {
        User.findOne({ username: req.params.userID })
            .then(data => {
                if (data == undefined) {
                    res.send(JSON.stringify({ status: "failed", message: "user not found" }))
                }
                else {
                    var idea = new Ideas({
                        userID: req.params.userID,
                        title: req.body.title,
                        description: req.body.description
                    })
                    idea.save(err => {
                        if (err) {
                            res.send(JSON.stringify({ status: "failed", message: "fail add to db" }))
                        }
                        else {
                            res.send(JSON.stringify({ status: "success" }))
                        }
                    })
                }
            })
            .catch(err => {
                res.send(JSON.stringify({ status: "failed", message: ".something error on our side" }))
            })
    }
    else {
        res.send(JSON.stringify({ status: "failed", message: "Pliss fill all slurr :((" }))
    }
})

app.get('/idea/get', (req, res) => {
    var titleQ = new RegExp(escapeRegExp(req.query.title) || "", "i")
    var descriptionQ = new RegExp(escapeRegExp(req.query.description) || "", "i")
    var query = {
        $and: [
            { title: { $regex: titleQ } },
            { description: { $regex: descriptionQ } }
        ]
    }

    Ideas.find(query)
        .then(result => {
            res.send({ status: "success", data: result })
        })
        .catch(err => {
            res.send(JSON.stringify({ status: "failed", message: ".something error on our side" }))
        })
})

app.get('/idea/')

app.listen(process.env.PORT, () => console.log(`Idea app listening on port ${process.env.PORT}!`))

function escapeRegExp(string) {
    if (string) return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched stringe
    else return ""
}
