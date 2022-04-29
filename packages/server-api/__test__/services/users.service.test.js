const dbLib = require('../../lib/db.lib')
const bcrypt = require('bcrypt')
const { getData } = require('../../lib/fetch.lib')
const {
  signIn,
  addUser,
  getFavoriteCharacters,
  addFavorites
} = require('../../services/users.service')

jest.mock('../../lib/db.lib')
jest.mock('bcrypt')
jest.mock('../../lib/fetch.lib')

describe('services - users', () => {
  const mockUserData = {
    userName: 'userName',
    password: 'secretPassword',
    favorites: [10, 20, 50]
  }
  describe('signIn method', () => {
    const isValidPassword = true

    test('When receiving ok user data user, should respond with Bearer token', async function () {
      dbLib.getUser.mockResolvedValue(mockUserData)
      bcrypt.compare.mockResolvedValue(isValidPassword)

      const response = await signIn(mockUserData)

      expect(response.length).toBeGreaterThan(0)
    })

    test('When receiving an unexisting user in db, should respond null', async function () {
      dbLib.getUser.mockResolvedValue(null)

      const response = await signIn(mockUserData)

      expect(response).toBe(null)
    })

    test('When receiving an invalid password, should respond with false', async function () {
      dbLib.getUser.mockResolvedValue(false)

      const response = await signIn(mockUserData)

      expect(response).toBe(null)
    })
  })

  describe('addUser method', () => {
    test('When receiving an unexisting user, should respond with Bearer token', async function () {
      const mockVerifyUser = false
      dbLib.getUser.mockResolvedValue(mockVerifyUser)
      dbLib.createUser.mockResolvedValue(mockUserData)

      const response = await addUser(mockUserData)

      expect(response.length).toBeGreaterThan(0)
    })

    test('When receiving an existing user, should respond with an error', async function () {
      const mockVerifyUser = true
      dbLib.getUser.mockResolvedValue(mockVerifyUser)

      try {
        await addUser(mockUserData)
      } catch (error) {
        expect(error).toBeTruthy()
      }
    })
  })

  describe('getFavoriteCharacters method', () => {
    const mockCharacters = {
      data: {
        results: [
          {
            id: 1,
            name: 'Rick Sanchez',
            status: 'Alive',
            species: 'Human',
            type: '',
            gender: 'Male'
          }
        ]
      }
    }

    test('When receiving favorites user data, should respond with characters data', async function () {
      getData.mockResolvedValue(mockCharacters)

      const response = await getFavoriteCharacters(mockUserData)

      expect(response).toBeTruthy()
    })

    test('When receiving none favorites user data, should respond with an error', async function () {
      mockUserData.favorites = []
      getData.mockResolvedValue(mockCharacters)

      try {
        await getFavoriteCharacters(mockUserData)
      } catch (error) {
        expect(error).toBeTruthy()
      }
    })
  })

  describe('addFavorites method', () => {
    test('When receiving new user data, should return the same new user data', async function () {
      const favorites = {
        data: [1, 50, 100]
      }
      mockUserData.favorites = favorites.data
      dbLib.updateUser.mockResolvedValue(mockUserData)

      const response = await addFavorites(mockUserData, favorites)

      expect(response.favorites).toEqual(favorites.data)
    })
  })
})
