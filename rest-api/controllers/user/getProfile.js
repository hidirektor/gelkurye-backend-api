const Users = require('../../models/Users');
const UserDocuments = require('../../models/UserDocuments');
const UserPreferences = require('../../models/UserPreferences');
const UserRating = require('../../models/UserRating');

module.exports = async (req, res) => {
    const { userID } = req.body;

    const user = await Users.findOne({ where: { userID } });
    const userDocuments = await UserDocuments.findOne({ where: { userID } });
    const userPreferences = await UserPreferences.findOne({ where: { userID } });
    const userRating = await UserRating.findOne({ where: { userID } });

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user, userDocuments, userPreferences, userRating });
};