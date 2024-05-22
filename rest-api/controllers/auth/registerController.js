const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const Document = require('../../models/UserDocuments');
const RefreshToken = require('../../models/RefreshToken');
const generateUserID = require('../../helpers/userIDGenerator');
require('dotenv').config();

exports.register = async (req, res) => {
    const { NameSurname, userName, phoneNumber, eMail, userType, password, profilePhoto, relativeNameSurname, relativePhoneNumber, registeredMerchant, address, licenseFrontFace, licenseBackFace } = req.body;

    try {
        const userID = generateUserID();
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ userID, NameSurname, userName, phoneNumber, eMail, userType, password: hashedPassword, profilePhoto, relativeNameSurname, relativePhoneNumber, registeredMerchant, address });
        const documents = await Document.create({ userID, userName, licenseFrontFace, licenseBackFace });

        const accessToken = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id, userType: user.userType }, process.env.REFRESH_SECRET);

        await RefreshToken.create({ token: refreshToken, userID: user.id });

        res.status(201).json({ message: 'User registered successfully', accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};