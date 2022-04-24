/* eslint-disable no-useless-catch */
const API_URL = 'https://rickandmortyapi.com/api'
const { getData } = require('../lib/fetch.lib.js')
const getRandomArbitrary = require('../utils/getRandomArbitrary.js')

async function getCharacters (queries) {
  try {
    const status = queries.status ? `status=${queries.status}&` : ''
    const gender = queries.gender ? `gender=${queries.gender}&` : ''
    const name = `name=${queries.name}`

    const response = await getData(`${API_URL}/character?${status}${gender}${name}`)

    return response.data
  } catch (error) {
    throw error
  }
}

async function getRandomCharacters () {
  try {
    const randomIds = []
    for (let i = 0; i < 10; i++) {
      randomIds.push(getRandomArbitrary(1, 800))
    }

    const url = `${API_URL}/character/${randomIds}`
    const response = await getData(url)

    return response.data
  } catch (error) {
    throw error
  }
}

module.exports = {
  getCharacters,
  getRandomCharacters
}
