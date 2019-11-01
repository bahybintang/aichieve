const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.static(__dirname + "./build"))

app.get(['/', '/login'], (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
})

app.listen(process.env.PORT, () => console.log(`Idea app listening on port ${process.env.PORT}!`))