const fs = require('fs')
const jwt = require('jsonwebtoken')
const publicKey = fs.readFileSync('public.pem', 'utf-8')
const User = require('../model/user')

user = (req, res, next) => {
    var token = req.headers.token
    res.locals.isAdmin = false
    jwt.verify(token, publicKey, { algorithm: ['RS256'] }, (err, payload) => {
        if (err) res.send({ status: "failed", message: err.toString() })
        else {
            User.findOne({ username: payload.username })
                .then(data => {
                    if (data == undefined) return Promise.reject(new Error("user not found!"))
                    else if (data.role === 'admin') res.locals.isAdmin = true
                    return next()
                })
                .catch(err => {
                    res.status(401).send({ status: "failed", message: err.toString() })
                })
        }
    })
}

admin = (req, res, next) => {
    var token = req.headers.token
    jwt.verify(token, publicKey, { algorithm: ['RS256'] }, (err, payload) => {
        if (err) res.send({ status: "failed", ...err })
        else {
            User.findOne({ username: payload.username })
                .then(data => {
                    if (data == undefined) return Promise.reject(new Error("user not found!"))
                    else if (data.role === 'admin') return next()
                    return Promise.reject(new Error("Not admin!"))
                })
                .catch(err => {
                    res.status(401).send({ status: "failed", message: err.toString() })
                })
}
    })
}

module.exports = {
    user,
    admin
}