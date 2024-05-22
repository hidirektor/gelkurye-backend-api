const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OTPLog = sequelize.define('OTPLog', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID: { type: DataTypes.STRING, unique: true, allowNull: true },
    otpType: { type: DataTypes.STRING, allowNull: true },
    otpCode: { type: DataTypes.STRING, allowNull: true },
    otpSent: { type: DataTypes.DATE,  allowNull: true, defaultValue: DataTypes.NOW },
    otpValidate: { type: DataTypes.DATE,  allowNull: true, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'OTPLog',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = OTPLog;