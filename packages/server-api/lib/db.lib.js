const { config } = require('../config')
const mongoose = require('mongoose')
const { Schema } = mongoose

const usersSchema = new Schema({
  userName: String,
  email: String,
  password: String,
  favorites: [Number]
})

const Users = mongoose.model('users', usersSchema)

async function inicialiceDb () {
  await mongoose.connect(`mongodb+srv://${config.dbUser}:${config.dbUserPassword}@cluster0.ya8wy.mongodb.net/${config.dbName}?retryWrites=true&w=majority`)
}

async function getUser (userName, email) {
  const userInDb = await Users.findOne({ $or: [{ userName: userName }, { email: email }] }, 'userName email favorites password')

  return userInDb
}

async function updateUser (userName, data) {
  const updateUser = await Users.findOneAndUpdate(
    { userName },
    { favorites: data },
    {
      new: true,
      projection: ['userName', 'email', 'favorites']
    })

  return updateUser
}

async function createUser (userModel) {
  const saveUser = await userModel.save()

  return saveUser
}

module.exports = {
  inicialiceDb,
  Users,
  getUser,
  createUser,
  updateUser
}
