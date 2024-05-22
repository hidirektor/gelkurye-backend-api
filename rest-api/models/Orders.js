const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Orders = sequelize.define('Orders', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    merchantID: { type: DataTypes.STRING, unique: true, allowNull: false },
    marketplaceName: { type: DataTypes.STRING, allowNull: false },
    marketplaceOrderID: { type: DataTypes.STRING, allowNull: false },
    isPaid: { type: DataTypes.BOOLEAN, allowNull: false },
    orderStatus: { type: DataTypes.STRING, allowNull: false },
    customerNameSurname: { type: DataTypes.STRING, allowNull: false },
    customerPhoneNumber: { type: DataTypes.STRING, allowNull: false },
    customerAddress: { type: DataTypes.STRING, allowNull: false },
    otpType: { type: DataTypes.STRING, allowNull: false },
    otpCode: { type: DataTypes.STRING, allowNull: false },
    otpTime: {
        type: DataTypes.BIGINT,
        defaultValue: null
    }
}, {
    timestamps: false,
    tableName: 'Orders',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = Orders;