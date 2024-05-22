const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MerchantsOwner = sequelize.define('MerchantsOwner', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, unique: true, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    eMail: { type: DataTypes.STRING, unique: true, allowNull: false }
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = MerchantsOwner;