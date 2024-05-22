const nodemailer = require('nodemailer');
const OTPLog = require('../../models/OTPLog');

module.exports = async (req, res) => {
    const { userID, otpType } = req.body;
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpSent = new Date();

    if (otpType === 'mail') {
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD
            }
        });

        const mailOptions = {
            from: process.env.EMAIL,
            to: req.body.email,
            subject: 'Your OTP Code',
            text: `Your OTP code is ${otpCode}`
        };

        transporter.sendMail(mailOptions, async (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }

            await OTPLog.create({ userID, otpType, otpCode, otpSent });
            res.json({ otpSent });
        });
    } else {
        // SMS sending code (commented out)
        /*
        // Implement SMS sending functionality here
        */
        await OTPLog.create({ userID, otpType, otpCode, otpSent });
        res.json({ otpSent });
    }
};
