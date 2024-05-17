const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserPreferences = sequelize.define('UserPreferences', {
    id: { type: DataTypes.INTEGER, primaryKey: true, index: true },
    userName: { type: DataTypes.STRING, unique: true, allowNull: false },
    nightMode: { type: DataTypes.BOOLEAN, defaultValue: false },
    selectedLanguage: { type: DataTypes.BOOLEAN, defaultValue: false },
    firstBreakTime: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
    secondBreakTime: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW }
}, {
    timestamps: false,
    charset: 'utf8',
    collate: 'utf8_general_ci'
});

module.exports = UserPreferences;