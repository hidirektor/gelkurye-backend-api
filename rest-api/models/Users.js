const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Users = sequelize.define('Users', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, index: true },
    userName: { type: DataTypes.STRING, unique: true, allowNull: false },
    eMail: { type: DataTypes.STRING, unique: true, allowNull: false },
    userType: { type: DataTypes.STRING, allowNull: false },
    NameSurname: { type: DataTypes.STRING, allowNull: false },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    address: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    profilePhoto: { type: DataTypes.STRING, allowNull: false },
    relativeNameSurname: { type: DataTypes.STRING, allowNull: false },
    relativePhoneNumber: { type: DataTypes.STRING, allowNull: false },
    registeredMerchant: { type: DataTypes.STRING, allowNull: true },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    tableName: 'Users',
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = Users;