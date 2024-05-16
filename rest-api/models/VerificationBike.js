const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VerificationBike = sequelize.define('VerificationBike', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userName: { type: DataTypes.STRING, allowNull: false },
    plateNumber: { type: DataTypes.STRING, allowNull: false },
    plateChangeDate: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = VerificationBike;