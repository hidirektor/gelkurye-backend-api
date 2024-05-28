const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Orders', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    merchantID: { type: DataTypes.STRING, unique: true, allowNull: false },
    marketplaceName: { type: DataTypes.STRING, allowNull: false },
    marketplaceOrderID: { type: DataTypes.STRING, allowNull: false },
    isPaid: { type: DataTypes.BOOLEAN, allowNull: false },
    orderStatus: { type: DataTypes.STRING, allowNull: false },
    customerNameSurname: { type: DataTypes.STRING, allowNull: false },
    customerPhoneNumber: { type: DataTypes.STRING, allowNull: false },
    customerAddress: { type: DataTypes.STRING, allowNull: false },
    customerLatitude: { type: DataTypes.DOUBLE, allowNull: false },
    customerLongitude: { type: DataTypes.DOUBLE, allowNull: false },
    courierReceived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    otpType: { type: DataTypes.STRING, allowNull: false },
    otpCode: { type: DataTypes.STRING, allowNull: true },
    otpSentTime: {
        type: DataTypes.BIGINT,
        defaultValue: null
    },
    deliveryTime: {
        type: DataTypes.BIGINT,
        defaultValue: null
    }
}, {
    timestamps: false,
    tableName: 'Orders',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = Order;