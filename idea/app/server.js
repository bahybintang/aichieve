const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Ideas = require('./model/idea')
const User = require('./model/user')
const bodyParser = require('body-parser')
dotenv.config()
mongoose.connect(`mongodb://aichieve-mongodb:27017/aichieve`, { useNewUrlParser: true }, (err) => {
    if (err) throw (err)
})

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/idea/:userID/add', (req, res) => {
    if (req.body.title != undefined && req.body.description != undefined) {
        User.findOne({ username: req.params.userID }, (err, data) => {
            if (err) {
                res.send(JSON.stringify({ status: "failed", message: ".something error on our side" }))
            }
            else if (data == undefined) {
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
    }
    else {
        res.send(JSON.stringify({ status: "failed", message: "Pliss fill all slurr :((" }))
    }
})

app.listen(process.env.PORT, () => console.log(`Idea app listening on port ${process.env.PORT}!`))
