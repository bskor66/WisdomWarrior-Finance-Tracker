const User = require('./User');
const Transactions = require('./Transactions')
// const Categories = require('./Categories')
const Budgets = require('./Budgets')

// one to many relationship - one user, many transactions
User.hasMany(Transactions, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Transactions.belongsTo(User, {
  foreignKey: 'user_id',
});

// Categories.hasMany(Transactions, {
//   foreignKey: 'category_id',
//   onDelete: 'CASCADE',
// });
// Transactions.belongsTo(Categories, {
//   foreignKey: 'category_id',
// })

User.hasMany(Budgets, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
});
Budgets.belongsTo(User, {
  foreignKey: 'user_id',
})

Budgets.hasMany(Transactions, {
  foreignKey: 'budget_id',
  onDelete: 'SET NULL'
})
Transactions.belongsTo(Budgets,{
  foreignKey: 'budget_id'
})

// Budgets.hasOne(Categories, {
//   onDelete: 'CASCADE'
// });
// Categories.belongsTo(Budgets, {
//   foreignKey: 'category_id'
// });

// Categories.belongsTo(User, {
//   foreignKey: 'category_id',
// });


module.exports = { User, Transactions, Budgets };
