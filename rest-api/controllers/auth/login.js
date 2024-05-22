const Users = require('../../models/Users');
const RefreshToken = require('../../models/RefreshToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { generateAccessToken } = require('../../config/jwt');

module.exports = async (req, res) => {
    const { phoneNumber, password } = req.body;

    const user = await Users.findOne({ where: { phoneNumber } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid password' });

    const accessToken = generateAccessToken({ userID: user.userID });
    const refreshToken = jwt.sign({ userID: user.userID }, process.env.JWT_SECRET);

    await RefreshToken.create({ token: refreshToken, userID: user.userID });

    res.json({ accessToken, refreshToken });
};
