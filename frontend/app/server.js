const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.static(__dirname + "./build"))
app.use(express.static(__dirname + "./public"))

app.get(['/', '/login'], (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
})

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Idea app listening on http://${process.env.HOST}:${process.env.PORT}!`))
