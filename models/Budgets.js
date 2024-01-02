const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Budgets extends Model { }

Budgets.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    budget: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    categories_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'categories'
  }
);
module.exports = Budgets;