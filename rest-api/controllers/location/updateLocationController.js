const UserLocation = require('../../models/UserLocation');

exports.updateLocation = async (req, res) => {
    const { userID, latitude, longitude } = req.body;

    try {
        const location = await UserLocation.create({ userID, latitude, longitude });
        res.status(200).json({ message: 'Location updated successfully', location });
    } catch (error) {
        res.status(500).json({ message: 'Error updating location', error });
    }
};