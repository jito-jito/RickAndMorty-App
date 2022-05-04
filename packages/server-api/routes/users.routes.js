const express = require('express')
const passport = require('passport')
const usersRouter = express.Router()
const {
  signIn,
  addUser,
  getFavoriteCharacters,
  addFavorites
} = require('../services/users.service')

// /api/users
usersRouter.post('/login', async function (req, res, next) {
  try {
    const userData = req.body
    const userToken = await signIn(userData)

    if (userToken === null) {
      res.status(400)
      res.send({
        status: 'error',
        statusText: 'unexisting user in app'
      })
    }

    if (userToken === false) {
      res.status(401)
      res.send({
        status: 'error',
        statusText: 'Unautorized'
      })
    }

    res.dataResponse = {
      issued_at: new Date().getMilliseconds(),
      access_token: userToken,
      token_type: 'Bearer'
    }
    next()
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/register', async function (req, res, next) {
  try {
    const userData = req.body
    const token = await addUser(userData)

    res.statusResponse = 201
    res.dataResponse = {
      status: 'success',
      access_token: token,
      token_type: 'Bearer'
    }
    next()
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/favorites',
  passport.authenticate('JWT', { session: false }),
  async function (req, res, next) {
    try {
      const userData = req.user
      const favoriteCharacters = await getFavoriteCharacters(userData)

      res.dataResponse = {
        data: favoriteCharacters
      }
      next()
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.post('/favorites',
  passport.authenticate('JWT', { session: false }),
  async function (req, res, next) {
    try {
      const userData = req.user
      const data = req.body
      const response = await addFavorites(userData, data)

      res.statusResponse = 201
      res.dataResponse = {
        status: 'success',
        data: response
      }
      next()
    } catch (error) {
      next(error)
    }
  }
)

usersRouter.use(function (req, res, next) {
  res.status(res.statusResponse || 200)
  res.send({
    status: 'success',
    ...res.dataResponse
  })
})

usersRouter.use(function (err, req, res, next) {
  switch (err) {
    case 'user already created':
      res.status(400)
      res.send('user already exists')
      break
    default:
      res.status(err.status)
      res.send(err.statusText)
      break
  }
})

module.exports = usersRouter
