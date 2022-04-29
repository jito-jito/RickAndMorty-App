const request = require('supertest')
const app = require('../../app')
const dbLib = require('../../lib/db.lib')
const {
  signIn,
  addUser
} = require('../../services/users.service')

jest.mock('../../services/users.service')
jest.mock('../../lib/db.lib')

dbLib.inicialiceDb.mockResolvedValue('succesfull conected')

describe('routes - users', () => {
  describe('POST /login', () => {
    test('When getting a saved user, should return with status 200 and data', () => {
      const mockToken = 'superipermebgaBearerToken'
      signIn.mockReturnValue(mockToken)

      return request(app).post('/api/users/login')
        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body).toBeTruthy()
        })
    })

    test('When getting a NOT saved user, should return with status 401 and an error message', () => {
      const unsavedUser = false
      signIn.mockReturnValue(unsavedUser)

      return request(app).post('/api/users/login')
        .then(response => {
          expect(response.statusCode).toBe(401)
          expect(response.body).toBeTruthy()
        })
    })
  })

  describe('POST /register', () => {
    test('When getting a successful register, should respond with status 201 and data', () => {
      const mockToken = 'superipermebgaBearerToken'
      addUser.mockResolvedValue(mockToken)

      return request(app).post('/api/users/register')

        .then(response => {
          expect(response.statusCode).toBe(201)
          expect(response.body).toBeTruthy()
        })
    })

    test('When getting a Bad register for existing user, should respond with status 400 and error message', () => {
      const mockError = 'user already created'
      addUser.mockRejectedValue(mockError)

      return request(app).post('/api/users/register')

        .then(response => {
          expect(response.statusCode).toBe(400)
          expect(response.body).toBeTruthy()
        })
    })
  })
})
