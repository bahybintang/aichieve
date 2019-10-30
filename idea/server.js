const express = require('express')
const app = express()
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const Ideas = require('./model/idea')
const bodyParser = require('body-parser')
dotenv.config()
mongoose.connect(`mongodb://localhost:27017/aichieve`, { useNewUrlParser: true })

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/idea/:userID/add', (req, res) => {
    var idea = new Ideas({
        userID: req.params.userID,
        title: req.body.title,
        description: req.body.description
    })
    idea.save(err => {
        if (err) {
            res.send(JSON.stringify({ status: "error" }))
        }
        else {
            res.send(JSON.stringify({ status: "success" }))
        }
    })
})

app.listen(process.env.PORT, () => console.log(`Idea app listening on port ${process.env.PORT}!`))