const UserService = require('../../services/userService');
const { handleError } = require('../../utils/errorUtil');

module.exports = async (req, res) => {
    const { userID, userData, userDocumentsData } = req.body;

    try {
        const result = await UserService.updateProfile(userID, userData, userDocumentsData);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
};