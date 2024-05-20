const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Merchants = sequelize.define('Merchants', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    merchantName: { type: DataTypes.STRING, allowNull: false },
    merchantAddress: { type: DataTypes.STRING, allowNull: false },
    ownerUserName: { type: DataTypes.STRING, unique: true, allowNull: false },
    contactNumber: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false,
    tableName: 'Merchants',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = Merchants;