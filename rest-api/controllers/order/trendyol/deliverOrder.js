const axios = require('axios');
const Orders = require('../../../models/Order');
const MerchantsAPI = require('../../../models/MerchantsAPI');
const moment = require('moment');

module.exports = async (req, res) => {
    const { packageID, userID } = req.body;

    try {
        const order = await Orders.findOne({ where: { marketplaceOrderID: packageID } });
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = 'Delivered';
        order.deliveryTime = moment().unix(); // Unix timestamp
        order.courierID = userID;
        await order.save();

        const merchantAPI = await MerchantsAPI.findOne({ where: { merchantID: order.merchantID } });
        if (!merchantAPI) {
            return res.status(404).json({ message: 'Merchant API details not found' });
        }

        const supplierID = merchantAPI.trendyolSupplierID;

        const trendyolResponse = await axios.put(`https://stageapi.trendyol.com/mealgw/suppliers/${supplierID}/packages/${packageID}/manual-delivered`, {
            actualDate: moment().valueOf() // Zorunlu olmamakla birlikte timestamp long olarak gönderilir
        }, {
            headers: {
                'x-agentname': process.env.TRENDYOL_AGENT_NAME,
                'x-executor-user': process.env.TRENDYOL_EXECUTOR_USER,
                'Authorization': 'Basic ' + Buffer.from(merchantAPI.trendyolAPIKey + ':' + merchantAPI.trendyolAPISecretKey).toString('base64')
            }
        });

        if (trendyolResponse.status === 200) {
            return res.status(200).json({ message: 'Order delivered and notified successfully' });
        } else {
            return res.status(trendyolResponse.status).json({ message: 'Failed to notify Trendyol' });
        }
    } catch (error) {
        console.error('Error delivering order:', error);
        res.status(500).json({ message: 'An unexpected error occurred while delivering the order.' });
    }
};
