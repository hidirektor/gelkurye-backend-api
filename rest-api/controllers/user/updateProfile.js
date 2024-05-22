const Users = require('../../models/Users');
const UserDocuments = require('../../models/UserDocuments');

module.exports = async (req, res) => {
    const { userID, userData, userDocumentsData } = req.body;

    const user = await Users.findOne({ where: { userID } });
    if (!user) return res.status(404).json({ message: 'User not found' });

    await user.update(userData);

    const userDocuments = await UserDocuments.findOne({ where: { userID } });
    if (userDocuments) {
        await userDocuments.update(userDocumentsData);
    } else {
        await UserDocuments.create({ userID, ...userDocumentsData });
    }

    res.json({ message: 'Profile updated successfully' });
};
