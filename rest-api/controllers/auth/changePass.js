const Users = require('../../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const { phoneNumber, oldPassword, newPassword } = req.body;

    const user = await Users.findOne({ where: { phoneNumber } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(401).json({ message: 'Invalid current password' });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: 'Password updated successfully' });
};
