const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class transactions extends Model {}

transactions.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
          },
          transaction_type: {
            type: DataTypes.STRING,
            allowNull: false,
          },
          transaction_amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
          user_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'User',
              key: 'id',
            },
          },
    },
    {
        sequelize,
        timestamps: true,
        freezeTableName: true,
        underscored: true,
        modelName: 'transaction'
      }
);

module.exports = transactions