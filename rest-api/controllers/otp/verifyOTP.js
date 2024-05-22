const OTPLog = require('../../models/OTPLog');

module.exports = async (req, res) => {
    const { userID, otpCode, otpSent } = req.body;

    const otpLog = await OTPLog.findOne({ where: { userID, otpSent } });

    if (!otpLog) {
        return res.status(404).json({ message: 'OTP not found' });
    }

    if (otpLog.otpCode === otpCode) {
        return res.json({ message: 'OTP verified successfully' });
    } else {
        return res.status(400).json({ message: 'Invalid OTP' });
    }
};
