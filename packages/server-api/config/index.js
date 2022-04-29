require('dotenv').config()

const config = {
  port: process.env.PORT || 5000,
  dbName: process.env.DB_NAME,
  dbUser: process.env.DB_USER,
  dbUserPassword: process.env.DB_USER_PASSWORD,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpirationTime: process.env.JWT_EXPIRES_IN
}

module.exports = { config }
