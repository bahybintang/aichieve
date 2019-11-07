const express = require('express')
const app = express()
const request = require('request')
const cors = require('cors')

app.use(cors())

app.use(['/auth', '/users'], (req, res) => {
    var url = process.env.NODE_ENV == 'dev' ? 'http://0.0.0.0:8083' + req.originalUrl : 'http://aichieve-auth' + req.originalUrl
    req.pipe(request(url)).pipe(res)
})

app.use('/idea', (req, res) => {
    var url = process.env.NODE_ENV == 'dev' ? 'http://0.0.0.0:8081/idea' + req.url : 'http://aichieve-idea/idea' + req.url
    req.pipe(request(url)).pipe(res)
})

app.use('/', (req, res) => {
    var url = process.env.NODE_ENV == 'dev' ? 'http://0.0.0.0:8082' + req.url : 'http://aichieve-frontend' + req.url
    req.pipe(request(url)).pipe(res)
})

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Main app listening on http://${process.env.HOST}:${process.env.PORT}!`))
