const express = require('express')
const app = express()
const dotenv = require('dotenv')
const path = require('path')
const withAuth = require('./middleware')
dotenv.config()

const secret = 'nubbangetsi';

app.use(express.static(path.join(__dirname, "build")))

app.get(['/', '/login'], (req, res) => {
    res.sendFile(__dirname + '/build/index.html')
})

app.get('/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.listen(process.env.PORT, process.env.HOST, () => console.log(`Frontend app listening on http://${process.env.HOST}:${process.env.PORT}!`))
