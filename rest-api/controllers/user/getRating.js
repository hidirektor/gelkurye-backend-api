const UserRating = require('../../models/UserRating');

module.exports = async (req, res) => {
    const { userID } = req.body;

    const userRating = await UserRating.findOne({ where: { userID } });

    if (!userRating) return res.status(404).json({ message: 'Rating not found' });

    res.json(userRating);
};
