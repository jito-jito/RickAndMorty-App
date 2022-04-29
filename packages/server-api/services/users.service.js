const API_URL = 'https://rickandmortyapi.com/api'
const bcrypt = require('bcrypt')
const { getData } = require('../lib/fetch.lib.js')
const {
  Users,
  getUser,
  createUser,
  updateUser
} = require('../lib/db.lib')
const { createToken } = require('../lib/auth/estrategies/jwt')

async function signIn (userData) {
  try {
    const userName = userData.userName
    const password = userData.password

    const user = await getUser(userName, password)
    if (!user) {
      return null
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    if (!isValidPassword) {
      return false
    }

    const Token = createToken({
      userName: user.userName,
      email: user.email,
      favorites: user.favorites
    })

    return Token
  } catch (error) {
    throw error
  }
}

async function addUser (userData) {
  try {
    const hasSavedUser = await getUser(userData.userName)
    if (hasSavedUser) {
      throw 'user already created'
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10)
    const newUser = new Users({
      userName: userData.userName,
      email: userData.email,
      password: hashedPassword,
      favorites: []
    })
    const createdUser = await createUser(newUser)

    const Token = createToken({
      userName: createdUser.userName,
      email: createdUser.email,
      favorites: createdUser.favorites
    })

    return Token
  } catch (error) {
    throw error
  }
}

async function getFavoriteCharacters (user) {
  try {
    const charactersId = user.favorites
    if (charactersId.length === 0) {
      throw 'user has no favorites added'
    }

    const response = await getData(`${API_URL}/character/${charactersId}`)

    return response.data
  } catch (error) {
    throw error
  }
}

async function addFavorites (userData, data) {
  try {
    const userName = userData.userName
    const favorites = data.favorites

    const response = await updateUser(userName, favorites)

    return response
  } catch (error) {
    throw error
  }
}

module.exports = {
  signIn,
  addUser,
  getFavoriteCharacters,
  addFavorites
}
