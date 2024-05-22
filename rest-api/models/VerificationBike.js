const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VerificationBike = sequelize.define('VerificationBike', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID: { type: DataTypes.STRING, unique: true, allowNull: false },
    plateNumber: { type: DataTypes.STRING, allowNull: false },
    plateChangeDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'VerificationBike',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = VerificationBike;