const fs = require('fs')
const jwt = require('jsonwebtoken')
const publicKey = fs.readFileSync('public.pem', 'utf-8')
const User = require('../model/user')

user = (req, res, next) => {
    var token = req.headers.token
    res.locals.isAdmin = false
    jwt.verify(token, publicKey, { algorithm: ['RS256'] }, (err, payload) => {
        if (err) res.send({ status: "failed", ...err })
        else {
            User.findOne({ username: payload.username }, (err, data) => {
                if (err) res.send({ status: "failed", ...err })
                else if (data == undefined) res.send({ status: "failed", message: "user not found" })
                else {
                    if (data.role === 'admin') res.locals.isAdmin = true
                    return next()
                }
            })
        }
    })
}

admin = (req, res, next) => {
    var token = req.headers.token
    jwt.verify(token, publicKey, { algorithm: ['RS256'] }, (err, payload) => {
        if (err) res.send({ status: "failed", ...err })
        else {
            User.findOne({ username: payload.username }, (err, data) => {
                if (err) res.send({ status: "failed", ...err })
                else if (data == undefined) res.send({ status: "failed", message: "user not found" })
                else {
                    if (data.role === 'admin') return next()
                    else res.send({ status: "failed", message: "not admin" })
                }
            })
        }
    })
}

module.exports = {
    user,
    admin
}