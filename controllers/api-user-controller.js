// will require sequelize connection and models to perform logic
// const sequelize = require('../config/connection');
const { User } = require('../models');

const indexAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password']
      }
    })
    res.status(200).json(allUsers)
  } catch (err) {
    res.status(500).json(err)
  }
}

const indexUser = async (req, res) => {
  try {
    const userId = req.params.id
    const getOneUser = await User.findByPk(userId,{
      attributes: {
        exclude: ['password']
      }
    }
    )
    if (!getOneUser) {
      return res.status(404).json('No user found with that ID')
    }
    res.json(getOneUser)
  } catch (err) {
    res.status(500).json(err)
  }
}

const postUser = async (req, res) => {
  const newUser = await User.create(req.body) //planned to change, using for testing
  res.json(newUser)
}

const updateUser = async (req, res) => {
  try {
    const updateUser = await User.update(req.body, {
      where: {
        id: req.params.id
      }
    }
    )
    res.status(204).json('User updated')
  } catch (err) {
    res.status(500).json(err)
  }
}

const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id
      }
    })
    res.status(200).json('User deleted')
  } catch (err) {
    res.status(500).json(err)
  }
}

module.exports = {
  indexAllUsers,
  indexUser,
  postUser,
  updateUser,
  deleteUser
}