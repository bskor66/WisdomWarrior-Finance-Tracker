// will require sequelize connection and models to perform logic
const User = require('../models/User');
const sequelize = require('../config/connection');

const indexAllUsers = async (req, res) => {
  const allUsers = await User.findAll()
  res.json(allUsers)
}

const postUser = async (req, res) => {
  const newUser = await User.create(req.body) //planned to change, using for testing
  res.json(newUser)
}

module.exports = {
  indexAllUsers,
  postUser
}