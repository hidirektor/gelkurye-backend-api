const UserService = require('../../services/userService');
const { handleError } = require('../../utils/errorUtil');

module.exports = async (req, res) => {
    const { preferencesData } = req.body;

    try {
        const result = await UserService.updatePreferences(req.user.userID, preferencesData);
        res.json(result);
    } catch (error) {
        handleError(res, error);
    }
};