const RefreshToken = require('../models/RefreshToken');

exports.logout = async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    try {
        await RefreshToken.destroy({ where: { token } });
        res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error });
    }
};