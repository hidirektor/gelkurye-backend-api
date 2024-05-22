const jwt = require('jsonwebtoken');
const RefreshToken = require('../models/RefreshToken');
require('dotenv').config();

exports.refreshToken = async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const storedToken = await RefreshToken.findOne({ where: { token } });
        if (!storedToken) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }

        const decoded = jwt.verify(token, process.env.REFRESH_SECRET);
        const accessToken = jwt.sign({ id: decoded.id, userType: decoded.userType }, process.env.JWT_SECRET, { expiresIn: '15m' });

        res.status(200).json({ accessToken });
    } catch (error) {
        res.status(403).json({ message: 'Invalid token', error });
    }
};