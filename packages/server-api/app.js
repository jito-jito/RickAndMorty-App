const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const passport = require('passport')
const { JWTStrategy } = require('./lib/auth/estrategies/jwt')
const charactersRouter = require('./routes/characters.routes')
const usersRouter = require('./routes/users.routes')
passport.use('JWT', JWTStrategy)
const { inicialiceDb } = require('./lib/db.lib')

inicialiceDb()

app.use(bodyParser.json())
app.use('/api/characters', charactersRouter)
app.use('/api/users', usersRouter)

module.exports = app
