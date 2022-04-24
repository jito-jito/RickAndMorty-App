const express = require('express')
const charactersRouter = express.Router()
const {
  getCharacters,
  getRandomCharacters
} = require('../services/characters.service')

// /api/characters
charactersRouter.get('/', async function (req, res, next) {
  try {
    const queries = req.query
    const data = await getCharacters(queries)

    res.status(200)
    res.send(data)
  } catch (error) {
    next(error)
  }
})

charactersRouter.get('/random', async function (req, res, next) {
  try {
    const data = await getRandomCharacters()

    res.status(200)
    res.send(data)
  } catch (error) {
    next(error)
  }
})

charactersRouter.use(function (err, req, res, next) {
  res.status(err.status)
  res.send(err.statusText)
})

module.exports = charactersRouter
