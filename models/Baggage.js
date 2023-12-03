const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Baggage extends Model {}

Baggage.init(
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
        capacity: {
            type: DataTypes.DECIMAL,
            allowNull: true,
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'baggage',
    }
);

module.exports = Baggage;