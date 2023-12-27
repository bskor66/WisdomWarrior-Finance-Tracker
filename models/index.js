const { User } = require('./User');
const { Transactions } = require('./transactions')
const { Categories } = require('./categories')
const { Budgets } = require('./budgets')

User.hasMany(Transactions, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  Transactions.belongsTo(User, {
    foreignKey: 'user_id',
  });

  Categories.hasMany(Transactions, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });

User.hasMany(Budgets, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
  });
  Budgets.hasOne(Categories, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });
  Categories.belongsTo(Budgets, {
    foreignKey: 'category_id',
    onDelete: 'CASCADE',
  });

  Categories.belongsTo(User, {
    foreignKey: 'category_id',
  });


module.exports = { User, Transactions, Categories };
