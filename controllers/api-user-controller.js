const session = require('express-session');
const bcrypt = require('bcrypt');
const { User, Budgets } = require('../models');

//* route: api/users/

const indexAllUsers = async (req, res) => {
  try {
    const allUsers = await User.findAll({
      attributes: {
        exclude: ['password'],
      },
    });
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
};
const indexUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const getOneUser = await User.findByPk(userId, {
      include: [
        {
          model: Budgets,
          attributes: {
            exclude: ['user_id'],
          },
        },
      ],
      attributes: {
        exclude: ['password'],
      },
    });
    if (!getOneUser) {
      return res.status(404).json('No user found with that ID');
    }
    res.json(getOneUser);
  } catch (err) {
    res.status(500).json(err);
  }
};
const indexBudgets = async (req, res) => {
  try {
    const userId = req.params.id;
    const getBudgets = await Budgets.findAll({
      where: {
        user_id: userId,
      },
      // attributes: {
      //   exclude: ['user_id'],
      // },
    });
    if (!getBudgets) {
      return res.status(404).json('No budgets found for that user');
    }
    res.json(getBudgets);
  } catch (err) {
    res.status(500).json(err);
  }
};
const postUser = async (req, res) => {
  try {
    const { firstName, lastName, userEmail, userPassword } = req.body;

    if (!(firstName && lastName && userEmail && userPassword)) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const createNewUser = await User.create({
      first_name: firstName,
      last_name: lastName,
      email: userEmail,
      password: userPassword
    })
    req.session.save(() => {
      req.session.logged_in = true
      req.session.user_id = createNewUser.id
      res.status(200).json(createNewUser)
    })
  } catch (error) {
    if (
      error.name === 'SequelizeValidationError' ||
      error.name === 'ValidationError'
    ) {
      return res
        .status(400)
        .json({ message: 'Validation error', errors: error.errors });
    }
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ message: 'User already exists' });
    }
    res
      .status(500)
      .json({ message: 'Internal Server Error', error: error.message });
  }
};
const updateUser = async (req, res) => {
  try {
    // * pass in current password, new password, and email
    const { currentPassword, newPassword, email } = req.body;
    if (!currentPassword ) {
      res.status(400).json('Please enter your current password');
      return;
    };
    if (!newPassword) {
      res.status(400).json('Please enter a new password');
      return;
    }
    if (!req.session.logged_in) {
      res.status(400).json('No user logged in');
      return;
    };
    if (currentPassword === newPassword) {
      res.status(400).json('New password cannot be the same as old password');
      return;
    }
    if (newPassword.length < 8) {
      res.status(400).json('Password must be at least 8 characters');
      return;
    };
    // check the provided password against the database
    const userData = await User.findOne({
      where: {
        id: req.session.user_id,
      },
    });
    if (!userData) {
      res.status(400).json('No user logged in');
      return;
    }

    const valid = await userData.checkPassword(currentPassword);
    if (!valid) {
      res.status(400).json('Incorrect password');
      return;
    };
    const updateUser = await User.update({
      email: email,
      password: await bcrypt.hash(newPassword, 10)
    }, {
      where: {
        id: req.params.id,
      },
    });
    if (!updateUser) {
      res.status(400).json('No user found with that ID');
      return;
    }
    res.status(204).json('User updated');
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};
const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json('User deleted');
  } catch (err) {
    res.status(500).json(err);
  }
};
const loginUser = async (req, res) => {
  try {
    if (!req.body.email || !req.body.password) {
      res.status(400).json('Please provide your credentials');
      return;
    }

    if (req.session.logged_in) {
      res.status(400).json('User already logged in');
      return;
    }

    const findUserEmail = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!findUserEmail)
      return res.status(400).json('Incorrect email or password');

    const validatePassword = findUserEmail.checkPassword(req.body.password);
    if (!validatePassword)
      return res.status(400).json('Incorrect email or password');

    req.session.save(() => {
      req.session.logged_in = true;
      req.session.user_id = findUserEmail.id;
      res.status(200).json('Successful login');
    });
  } catch (err) {
    res.status(500).json(err);
  }
};
const logoutUser = async (req, res) => {
  if (req.session.logged_in) {
    req.session.logged_in = false;
    req.session.destroy(() => {
      res.json('User logged out').end();
    });
  } else {
    res.status(404).json('No user logged in').end();
  }
};
const postBudget = async (req, res) => {
  try {
    const newBudget = await Budgets.create({
      name: req.body.name,
      amount: req.body.amount,
      user_id: req.params.id,
    });
    if (!req.session.user_id && !req.body.user_id) {
      res.status(400).json({ error: 'Must be logged in to create a budget' });
      return;
    }

    if (!req.body.name || !req.body.amount) {
      res.status(400).json({ error: 'Must include id, name, and amount' });
      return;
    }
    res.json(newBudget);
  } catch (err) {
    res.status(500).json(err);
  }
};
const deleteBudget = async (req, res) => {
  try {
    const deleteBudget = await Budgets.destroy({
      where: {
        user_id: req.params.id,
      },
    });
    res.status(200).json('Budgets deleted');
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  indexAllUsers,
  indexUser,
  postUser,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  indexBudgets,
  postBudget,
  deleteBudget,
};
