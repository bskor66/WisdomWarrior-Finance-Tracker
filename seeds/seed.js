const sequelize = require('../config/connection');
const { User, transaction, category } = require('../models');

const userSeedData = require('./userData.json');
const transactionsSeedData = require('./transactionsData.json');
const categoriesSeedData = require('./categoriesData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const Users = await User.bulkCreate(userSeedData, {
    individualHooks: true,
    returning: true,
  });
  const transactions = await Transaction.bulkCreate(transactionsSeedData, {
    returning: true,
  });

  const categories = await Category.bulkCreate(categoriesSeedData, {
    returning: true,
  });
  process.exit(0);
};

seedDatabase();
