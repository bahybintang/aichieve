const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()

app.use(express.static(path.join(__dirname, "build")))

app.get(['/', '/login'], (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
})

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Frontend app listening on http://${process.env.HOST}:${process.env.PORT}!`))
