const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
const Document = require('../models/UserDocuments');
require('dotenv').config();

exports.register = async (req, res) => {
    const { NameSurname, userName, phoneNumber, eMail, userType, password, profilePhoto, relativeNameSurname, relativePhoneNumber, registeredMerchant, address, licenseFrontFace, licenseBackFace } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ NameSurname, userName, phoneNumber, eMail, userType, password: hashedPassword, profilePhoto, relativeNameSurname, relativePhoneNumber, registeredMerchant, address });
        const documents = await Document.create({userName, licenseFrontFace, licenseBackFace});

        const token = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error registering user', error });
    }
};