const UserRating = require('../../models/UserRating');

module.exports = async (req, res) => {
    const { userID, userRating } = req.body;

    const userRatingRecord = await UserRating.findOne({ where: { userID } });
    if (!userRatingRecord) return res.status(404).json({ message: 'Rating not found' });

    await userRatingRecord.update({ userRating });

    res.json({ message: 'Rating updated successfully' });
};
