/* eslint-disable no-undef */
const {
  getCharacters,
  getRandomCharacters
} = require('../../services/characters.service')

describe('services - characters', () => {
  test('getCharacters method should response with results data', async function () {
    const queries = { status: 'alive', gender: 'male', name: 'rick' }

    const response = await getCharacters(queries)

    expect(response.results.length).toBeGreaterThan(0)
  })
  test('getRandomCharacters method should response with 10 random characters', async function () {
    const response = await getRandomCharacters()

    expect(response.length).toBe(10)
  })
})
