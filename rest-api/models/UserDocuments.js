const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserDocuments = sequelize.define('UserDocuments', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userID: { type: DataTypes.STRING, allowNull: false },
    userName: { type: DataTypes.STRING, unique: true, allowNull: false },
    licenseFrontFace: { type: DataTypes.STRING, allowNull: false },
    licenseBackFace: { type: DataTypes.STRING, allowNull: false }
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = UserDocuments;