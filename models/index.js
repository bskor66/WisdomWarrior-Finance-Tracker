const { User } = require('./User');
const { transactions } = require('./transactions')
const { category } = require('./categories')

User.hasMany(transactions, {
    foreignKey: 'reader_id',
    onDelete: 'CASCADE',
  });
  transactions.belongsTo(User, {
    foreignKey: 'reader_id',
  });
  

module.exports = { User, transaction, category };
