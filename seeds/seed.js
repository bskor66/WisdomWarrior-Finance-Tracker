const { Budgets, User, Transactions } = require('../models');
const sequelize = require('../config/connection');

const userData = [
  {
    first_name: "John",
    last_name: "Doe",
    email: "john.doe@email.com",
    password: "12345678"
  },
  // Add more users as needed
];

const seedUser = () => User.bulkCreate(userData);

const budgetData = [
  {
    name: 'Budget 1',
    amount: 500,
    user_id: 1,
  },
  // Add more budgets as needed
];

const seedBudgets = () => Budgets.bulkCreate(budgetData);

const transactionData = [
  {
    is_expense: true,
    transaction_amount: 100,
    user_id: 1,
    budget_id: 1,
  },
  // Add more transactions as needed
];

const seedTransactions = () => Transactions.bulkCreate(transactionData);

sequelize.sync({ force: true }).then(() => {
  seedUser()
    .then(() => seedBudgets())
    .then(() => seedTransactions())
    .then(() => console.log('Database seeded!'))
    .catch((error) => console.log(error));
});