const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transactions extends Model { }

Transactions.init(
  {
    //ID of transaction
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    // True = Expense False = Income
    is_expense: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    // Amount of Transaction
    transaction_amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // FK Id of User
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    budget_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'budgets',
        key: 'id'
      }
     }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'transactions'
  }
);

module.exports = Transactions