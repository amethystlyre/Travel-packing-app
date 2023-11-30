const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class PackList extends Model {}

PackList.init(
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
        date_from: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        date_to: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        destinations: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        transports: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        climates: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
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
        modelName: 'packList',
    }
);

module.exports = PackList;
