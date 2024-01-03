const { Budgets, User } = require('../models');
const sequelize = require('../config/connection');

const budgetData = [
  {
    name: 'Budget 1',
    amount: 500,
    user_id: 1,
  }
  // Add more budgets as needed
];
const userData = [
  {
    first_name: "new",
    last_name: "name",
    email: "emaasdfil@email.com",
    password: "12345asdf78"
  }
  // Add more budgets as needed
];

const seedUser = () => User.bulkCreate(userData);
const seedBudgets = () => Budgets.bulkCreate(budgetData);

sequelize.sync({ force: true }).then(() => {
  seedUser()
  seedBudgets()
})