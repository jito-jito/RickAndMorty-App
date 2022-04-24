const express = require('express')
const app = express()
const charactersRouter = require('./routes/characters.routes')

app.use('/api/characters', charactersRouter)

module.exports = app
