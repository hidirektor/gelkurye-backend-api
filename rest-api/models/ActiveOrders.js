const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ActiveOrders = sequelize.define('ActiveOrders', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    merchantID: { type: DataTypes.STRING, unique: true, allowNull: false },
    marketplaceName: { type: DataTypes.STRING, allowNull: false },
    marketplaceOrderID: { type: DataTypes.STRING, allowNull: false },
    isPaid: { type: DataTypes.BOOLEAN, allowNull: false },
    orderStatus: { type: DataTypes.STRING, allowNull: false },
    customerNameSurname: { type: DataTypes.STRING, allowNull: false },
    customerPhoneNumber: { type: DataTypes.STRING, allowNull: false },
    customerAddress: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'ActiveOrders',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = ActiveOrders;