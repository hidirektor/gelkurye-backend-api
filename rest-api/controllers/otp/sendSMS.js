const axios = require('axios');
const OTPLog = require('../../models/OTPLog');
const Users = require('../../models/Users');
const https = require('https');
const xml2js = require('xml2js');
const moment = require('moment');

module.exports = async (req, res) => {
    const { userID, phoneNumber } = req.body;
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const otpSent = moment().unix();

    try {
        const user = await Users.findOne({ where: { userID, phoneNumber } });
        if (!user) {
            return res.status(404).json({ message: 'Invalid userID or phone number. User not found.' });
        }

        const xmlBody = `
            <?xml version="1.0"?>
            <mainbody>
                <header>
                    <usercode>${process.env.NETGSM_USERCODE}</usercode>
                    <password>${process.env.NETGSM_PASSWORD}</password>
                    <msgheader>${process.env.NETGSM_MSGHEADER}</msgheader>
                    <appkey>${process.env.NETGSM_APPKEY}</appkey>
                </header>
                <body>
                    <msg><![CDATA[${otpCode}]]></msg>
                    <no>${phoneNumber}</no>
                </body>
            </mainbody>
        `;

        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        const response = await axios.post('https://api.netgsm.com.tr/sms/send/otp', xmlBody, {
            headers: {
                'Content-Type': 'application/xml'
            },
            httpsAgent: agent
        });

        const result = await xml2js.parseStringPromise(response.data);
        if (result.mainbody && result.mainbody.header[0].status[0] === '00') {
            await OTPLog.create({ userID, otpType: 'sms', otpCode, otpSent });
            res.json({ otpSent });
        } else {
            res.status(500).json({ message: 'Error sending SMS', error: result });
        }
    } catch (error) {
        console.error('Error processing request:', error);
        res.status(500).json({ message: 'An unexpected error occurred. Please try again later.' });
    }
};