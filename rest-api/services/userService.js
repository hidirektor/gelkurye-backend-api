const Users = require('../models/User');
const UserPreferences = require('../models/UserPreferences');
const UserDocuments = require('../models/UserDocuments');
const UserRating = require('../models/UserRating');
const Merchants = require('../models/Merchants');
const MerchantsAPI = require('../models/MerchantsAPI');
const CustomError = require('../utils/customError');

class UserService {
    static async getProfile(phoneNumber) {
        const user = await Users.findOne({ where: { phoneNumber } });
        if (!user) throw new CustomError('User not found', 404);

        const userID = user.userID;
        const userDocuments = await UserDocuments.findOne({ where: { userID } });
        const userPreferences = await UserPreferences.findOne({ where: { userID } });
        const userRating = await UserRating.findOne({ where: { userID } });
        const Merchant = await Merchants.findOne({ where: { userID } });
        const merchantID = Merchant.merchantID;
        const MerchantAPI = await MerchantsAPI.findOne({ where: { merchantID } });

        return { user, userDocuments, userPreferences, userRating, Merchant, MerchantAPI };
    }

    static async updateProfile(phoneNumber, userData, userDocumentsData, userPreferencesData) {
        const user = await Users.findOne({ where: { phoneNumber } });
        if (!user) throw new CustomError('User not found', 404);

        await user.update(userData);

        const userID = user.userID;

        const userDocuments = await UserDocuments.findOne({ where: { userID } });
        if (userDocuments) {
            await userDocuments.update(userDocumentsData);
        } else {
            await UserDocuments.create({ userID, ...userDocumentsData });
        }

        const userPreferences = await UserPreferences.findOne({ where: { userID } });
        if (userPreferences) {
            await userPreferences.update(userPreferencesData);
        } else {
            await UserPreferences.create({ userID, ...userPreferencesData });
        }

        return { message: 'Profile updated successfully' };
    }

    static async getPreferences(userID) {
        const userPreferences = await UserPreferences.findOne({ where: { userID } });
        if (!userPreferences) throw new CustomError('Preferences not found', 404);

        return userPreferences;
    }

    static async updatePreferences(phoneNumber, preferencesData) {
        const user = await Users.findOne({ where: { phoneNumber } });
        const userID = user.userID;

        const userPreferences = await UserPreferences.findOne({ where: { userID } });
        if (!userPreferences) throw new CustomError('Preferences not found', 404);

        await userPreferences.update(preferencesData);

        return { message: 'Preferences updated successfully' };
    }

    static async getRating(userID) {
        const userRating = await UserRating.findOne({ where: { userID } });
        if (!userRating) throw new CustomError('Rating not found', 404);

        return userRating;
    }

    static async updateRating(userID, userRating) {
        const userRatingRecord = await UserRating.findOne({ where: { userID } });
        if (!userRatingRecord) throw new CustomError('Rating not found', 404);

        await userRatingRecord.update({ userRating });

        return { message: 'Rating updated successfully' };
    }
}

module.exports = UserService;
