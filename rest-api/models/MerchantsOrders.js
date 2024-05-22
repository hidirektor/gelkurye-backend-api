const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MerchantsOrders = sequelize.define('MerchantsOrders', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID: { type: DataTypes.STRING, allowNull: false },
    merchantId: { type: DataTypes.INTEGER, allowNull: false },
    carrierName: { type: DataTypes.STRING, allowNull: false },
    marketplaceName: { type: DataTypes.STRING, allowNull: false },
    marketplaceOrderID: { type: DataTypes.STRING, allowNull: false },
    isPaid: { type: DataTypes.BOOLEAN, allowNull: false },
    orderStatus: { type: DataTypes.STRING, allowNull: false },
    customerNameSurname: { type: DataTypes.STRING, allowNull: false },
    customerPhoneNumber: { type: DataTypes.STRING, allowNull: false },
    customerAddress: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'MerchantsOrders',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = MerchantsOrders;