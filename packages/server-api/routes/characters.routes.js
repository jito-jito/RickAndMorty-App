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

    res.statusResponse = 200
    res.dataResponse = data
    next()
  } catch (error) {
    next(error)
  }
})

charactersRouter.get('/random', async function (req, res, next) {
  try {
    const data = await getRandomCharacters()

    res.statusResponse = 200
    res.dataResponse = data
    next()
  } catch (error) {
    next(error)
  }
})

charactersRouter.use(function (req, res, next) {
  res.status(res.statusResponse)
  res.send({
    status: 'success',
    results: res.dataResponse
  })
})

charactersRouter.use(function (err, req, res, next) {
  switch (err) {
    case 'user has no favorites added':
      res.status(201)
      res.send('user has no favorites added')
      break

    default:
      res.status(err.status)
      res.send({
        status: 'error',
        statusText: err.statusText
      })
      break
  }
})

module.exports = charactersRouter
