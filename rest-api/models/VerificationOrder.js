const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const VerificationOrder = sequelize.define('VerificationOrder', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID: { type: DataTypes.STRING, unique: true, allowNull: false },
    customerName: { type: DataTypes.STRING, allowNull: false },
    customerPhoneNumber: { type: DataTypes.STRING, allowNull: false },
    customerAddress: { type: DataTypes.STRING, allowNull: false },
    otpType: { type: DataTypes.STRING, allowNull: false },
    otpCode: { type: DataTypes.STRING, allowNull: false },
    otpTime: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'VerificationOrder',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = VerificationOrder;