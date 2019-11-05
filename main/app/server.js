const express = require('express')
const app = express()
const dotenv = require('dotenv')
const request = require('request')
dotenv.config()

app.use('/auth', (req, res) => {
    var url = 'http://aichieve-auth/auth' + req.url
    req.pipe(request(url)).pipe(res)
})

app.use('/idea', (req, res) => {
    var url = 'http://aichieve-idea/idea' + req.url
    req.pipe(request(url)).pipe(res)
})

app.get('/', (req, res) => {
    res.send({ test: "test" })
})

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Idea app listening on http://${process.env.HOST}:${process.env.PORT}!`))
