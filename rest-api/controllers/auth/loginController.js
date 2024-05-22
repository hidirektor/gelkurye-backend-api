const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../../models/Users');
const RefreshToken = require('../../models/RefreshToken');
require('dotenv').config();

exports.login = async (req, res) => {
    const { userName, password } = req.body;

    try {
        const user = await User.findOne({ where: { userName } });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const accessToken = jwt.sign({ id: user.id, userType: user.userType }, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id, userType: user.userType }, process.env.REFRESH_SECRET);

        await RefreshToken.create({ token: refreshToken, userId: user.id });

        res.status(200).json({ message: 'Logged in successfully', accessToken, refreshToken });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};