const express = require('express')
const app = express()
const dotenv = require('dotenv')
const request = require('request')
dotenv.config()

app.use('/auth', (req, res) => {
    var url = 'http://aichieve-auth:49001/auth' + req.url
    req.pipe(request(url)).pipe(res)
})

app.use('/idea', (req, res) => {
    var url = 'http://aichieve-idea:49002/idea' + req.url
    req.pipe(request(url)).pipe(res)
})

app.listen(process.env.PORT, () => console.log(`Idea app listening on port ${process.env.PORT}!`))
