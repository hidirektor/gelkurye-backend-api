const Users = require('../../models/Users');
const UserDocuments = require('../../models/UserDocuments');
const UserPreferences = require('../../models/UserPreferences');
const UserRating = require('../../models/UserRating');
const bcrypt = require('bcryptjs');

module.exports = async (req, res) => {
    const { userID, userName, eMail, userType, NameSurname, phoneNumber, address, password, profilePhoto, relativeNameSurname, relativePhoneNumber } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Users.create({
        userID, userName, eMail, userType, NameSurname, phoneNumber, address, password: hashedPassword, profilePhoto, relativeNameSurname, relativePhoneNumber
    });

    await UserDocuments.create({ userID, licenseFrontFace: '', licenseBackFace: '' });
    await UserPreferences.create({
        userID,
        nightMode: false,
        selectedLanguage: true,
        firstBreakTime: new Date(new Date().setHours(10, 0, 0)),
        secondBreakTime: new Date(new Date().setHours(18, 0, 0))
    });
    await UserRating.create({ userID, userRating: 0 });

    res.json(newUser);
};
