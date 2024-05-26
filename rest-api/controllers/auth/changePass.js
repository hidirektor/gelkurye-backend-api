const Users = require('../../models/User');
const RefreshToken = require('../../models/RefreshToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { phoneNumber, oldPassword, newPassword } = req.body;

    const user = await Users.findOne({ where: { phoneNumber } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid current password' });

    const refreshTokenExists = await RefreshToken.findOne({ where: { userID: user.userID } });
    if (!refreshTokenExists) return res.status(401).json({ message: 'User not authenticated' });

    const currentTime = Math.floor(Date.now() / 1000);
    if (user.lastPasswordChange && (currentTime - user.lastPasswordChange) < 7 * 24 * 60 * 60) {
        return res.status(400).json({ message: 'Password can only be changed once every 7 days' });
    }

    const isSamePassword = await bcrypt.compare(newPassword, user.password);
    if (isSamePassword) {
        return res.status(400).json({ message: 'New password cannot be the same as the old password' });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    user.lastPasswordChange = currentTime;
    await user.save();

    res.json({ message: 'Password updated successfully' });
};