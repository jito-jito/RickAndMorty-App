const { getCharacters, getRandomCharacters } = require('../../services/characters.service')
const { getData } = require('../../lib/fetch.lib')

jest.mock('../../lib/fetch.lib')

describe('services - characters', () => {
  test('getCharacters method should response with results data', async function () {
    const mockQueries = { status: 'alive', gender: 'male', name: 'rick' }
    const mockResponse = {
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
    getData.mockResolvedValue(mockResponse)

    const response = await getCharacters(mockQueries)

    expect(response.length).toBeGreaterThan(0)
  })

  test('getRandomCharacters method should response with 10 random characters', async function () {
    const mockResponse = {
      data: [
        {
          id: 1
        },
        {
          id: 1
        },
        {
          id: 1
        },
        {
          id: 1
        },
        {
          id: 1
        },
        {
          id: 1
        },
        {
          id: 1
        },
        {
          id: 1
        },
        {
          id: 1
        },
        {
          id: 1
        }
      ]
    }

    getData.mockResolvedValue(mockResponse)

    const response = await getRandomCharacters()

    expect(response.length).toBe(10)
  })
})
