const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserLocation = sequelize.define('UserLocation', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID: { type: DataTypes.STRING, unique: true, allowNull: false },
    latitude: { type: DataTypes.FLOAT, allowNull: false },
    longitude: { type: DataTypes.FLOAT, allowNull: false },
    timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'UserLocation',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = UserLocation;