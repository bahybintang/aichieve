const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config()

app.use(express.static(__dirname + "./public"))

app.get(['/', '/login'], (req, res) => {
    res.sendFile(__dirname + '/client/build/index.html')
})

app.listen(process.env.PORT, () => console.log(`Idea app listening on port ${process.env.PORT}!`))
