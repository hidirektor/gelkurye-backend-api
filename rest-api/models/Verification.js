const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Verification = sequelize.define('Verification', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userName: { type: DataTypes.STRING, allowNull: false },
    otpType: { type: DataTypes.STRING, allowNull: false },
    otpCode: { type: DataTypes.STRING, allowNull: false },
    otpTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = Verification;