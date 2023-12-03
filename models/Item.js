const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Item extends Model {}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        weight: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        size: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'category',
                key: 'id',
            },
        },
        baggage_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'baggage',
                key: 'id',
            },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'item',
    }
);

module.exports = Item;
