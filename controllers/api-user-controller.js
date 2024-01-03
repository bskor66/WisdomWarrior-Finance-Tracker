// const sequelize = require('../config/connection');
const session = require('express-session');
const { User } = require('../models');

//* route: api/users/

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
    const getOneUser = await User.findByPk(userId, {
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
  try {
    const { first_name: firstName, last_name: lastName, email: userEmail, password: userPassword } = req.body
    if (!(firstName && lastName && userEmail && userPassword)) {
      return res.status(400).json('invalid entry')
    }
    const createNewUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      password: userPassword
    })
    req.session.save(()=>{
      req.session.logged_in = true
      req.session.user_id = createNewUser.id
      res.status(200).json(createNewUser)
    })
  } catch (err) {
    res.status(500).json(err)
  }
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
const loginUser = async (req, res) => {
  const findUserEmail = await User.findOne({
    where: {
      email: req.body.email
    }
  })
  if (!findUserEmail) return res.status(400).json('Incorrect email or password')

  const validatePassword = await findUserEmail.checkPassword(req.body.password)

  if (!validatePassword) return res.status(400).json('Incorrect email or password')

  req.session.save(()=>{
    req.session.logged_in = true;
    req.session.user_id = findUserEmail.id
    res.status(200).json('Successful login')
  })
}
const logoutUser = async (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).json('Session destroyed').end();
    });
  } else {
    res.status(404).json('No user logged in').end();
  }
}

module.exports = {
  indexAllUsers,
  indexUser,
  postUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser
}