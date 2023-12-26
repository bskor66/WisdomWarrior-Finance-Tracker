const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class categories extends Model { }

category.init(
    {
        categories_type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        budget: {
            type: DataTypes.FLOAT,
            allowNull: false,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'categories'
    }
);
module.exports = categories;