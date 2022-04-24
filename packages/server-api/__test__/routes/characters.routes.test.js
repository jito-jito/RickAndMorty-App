/* eslint-disable no-undef */
const request = require('supertest')
const app = require('../../app')

describe('routes - characters', () => {
  describe('GET api/characters', () => {
    test('should response with status 200', () => {
      return request(app).get('/api/characters?status=alive&gender=male&name=rick')
        .then(response => {
          expect(response.statusCode).toBe(200)
        })
    })
  })
  describe('GET api/characters/random', () => {
    test('should response with status 200', () => {
      return request(app).get('/api/characters/random')
        .then(response => {
          expect(response.statusCode).toBe(200)
        })
    })
  })
})
