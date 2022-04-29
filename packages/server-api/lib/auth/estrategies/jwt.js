const { config } = require('../../../config')
const jwt = require('jsonwebtoken')
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const { getUser } = require('../../db.lib')
const opts = {}

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
opts.secretOrKey = config.jwtSecret
// opts.issuer = 'URLBackendserver'
// opts.audience = 'URLClientServer'

const JWTStrategy = new JwtStrategy(opts, async function (jwtPayload, done) {
  try {
    const user = await getUser(jwtPayload.userName, jwtPayload.email)
    if (user) {
      return done(null, user)
    } else {
      return done(null, false)
    }
  } catch (error) {
    return done(error, false)
  }
})

function createToken (data) {
  return jwt.sign(data, config.jwtSecret, { expiresIn: config.jwtExpirationTime })
}

module.exports = {
  JWTStrategy,
  createToken
}
