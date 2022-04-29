const request = require('supertest')
const app = require('../../app')
const dbLib = require('../../lib/db.lib')
const charactersService = require('../../services/characters.service')

jest.mock('../../services/characters.service')
jest.mock('../../lib/db.lib')

dbLib.inicialiceDb.mockResolvedValue('succesfull conected')

describe('routes - characters', () => {
  const mockCharacter = {
    id: 125,
    name: 'Flansian',
    status: 'Alive'
  }
  const mockQueries = {
    status: 'alive',
    gender: 'male',
    name: 'rick',
    badName: 'jito'
  }

  describe('GET api/characters', () => {
    test('When getting a successful response, should respond with status 200 and data', () => {
      const goodUrl = `/api/characters?status=${mockQueries.status}&gender=${mockQueries.gender}&name=${mockQueries.name}`
      charactersService.getCharacters.mockReturnValue([mockCharacter])

      return request(app).get(goodUrl)

        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body.results.length).toBeGreaterThan(0)
        })
    })

    test('When not found results, should respond with status 404 and error message', () => {
      const badUrl = `/api/characters?status=${mockQueries.status}&gender=${mockQueries.gender}&name=${mockQueries.badName}`
      charactersService.getCharacters.mockRejectedValue({
        status: 404,
        statusText: 'Not Found'
      })

      return request(app).get(badUrl)

        .then(response => {
          expect(response.statusCode).toBe(404)
          expect(response.body.statusText).toEqual('Not Found')
        })
    })
  })

  describe('GET api/characters/random', () => {
    charactersService.getRandomCharacters.mockReturnValue([mockCharacter])

    test('When getting a successful response, should response with status 200 and data', () => {
      const url = '/api/characters/random'

      return request(app).get(url)

        .then(response => {
          expect(response.statusCode).toBe(200)
          expect(response.body.results.length).toBeGreaterThan(0)
        })
    })
  })
})
