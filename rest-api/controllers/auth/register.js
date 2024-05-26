const Users = require('../../models/User');
const UserDocuments = require('../../models/UserDocuments');
const UserPreferences = require('../../models/UserPreferences');
const UserRating = require('../../models/UserRating');
const Merchants = require('../../models/Merchants');
const bcrypt = require('bcryptjs');
const generateUserID = require('../../helpers/userIDGenerator');
const { v4: uuidv4 } = require('uuid');

module.exports = async (req, res) => {
    const {
        userName, eMail, userType, NameSurname, phoneNumber, address, password,
        profilePhoto, relativeNameSurname, relativePhoneNumber, licenseFrontFace,
        licenseBackFace, merchantName, merchantAddress, contactNumber
    } = req.body;

    try {
        let userID = generateUserID();
        let userExists = await Users.findOne({ where: { userID } });

        // Ensure userID is unique
        while (userExists) {
            userID = generateUserID();
            userExists = await Users.findOne({ where: { userID } });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await Users.create({
            userID, userName, eMail, userType, NameSurname, phoneNumber, address, password: hashedPassword,
            profilePhoto, relativeNameSurname, relativePhoneNumber
        });

        if (userType === 'MERCHANT') {
            let merchantID = uuidv4();
            let merchantExists = await Merchants.findOne({ where: { merchantID } });

            while (merchantExists || await Users.findOne({ where: { userID: merchantID } })) {
                merchantID = uuidv4();
                merchantExists = await Merchants.findOne({ where: { merchantID } });
            }

            await Merchants.create({
                userID,
                merchantID,
                merchantName,
                merchantAddress,
                contactNumber
            });
        }

        await UserDocuments.create({ userID, licenseFrontFace, licenseBackFace });
        await UserPreferences.create({
            userID,
            nightMode: false,
            selectedLanguage: true,
            firstBreakTime: new Date(new Date().setHours(10, 0, 0)),
            secondBreakTime: new Date(new Date().setHours(18, 0, 0))
        });
        await UserRating.create({ userID, userRating: 0 });

        res.json(newUser);
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
            const field = error.errors[0].path;
            const message = field === 'userName' ? 'Username is already taken' : field === 'eMail' ? 'Email is already registered' : 'Unique constraint error';
            res.status(400).json({ message });
        } else if (error.name === 'SequelizeValidationError') {
            const message = error.errors.map(e => e.message).join(', ');
            res.status(400).json({ message });
        } else {
            res.status(500).json({ message: 'An unexpected error occurred while registering user' });
        }
    }
};