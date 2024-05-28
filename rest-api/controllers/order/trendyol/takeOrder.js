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

        order.orderStatus = 'Shipped';
        order.courierReceived = true;
        order.courierID = userID;
        order.courierReceivedTime = moment().unix(); // Unix timestamp
        await order.save();

        const merchantAPI = await MerchantsAPI.findOne({ where: { merchantID: order.merchantID } });
        if (!merchantAPI) {
            return res.status(404).json({ message: 'Merchant API details not found' });
        }

        const supplierID = merchantAPI.trendyolSupplierID;

        const trendyolResponse = await axios.put(`https://stageapi.trendyol.com/mealgw/suppliers/${supplierID}/packages/${packageID}/manual-shipped`, {
            actualDate: moment().valueOf() // Zorunlu olmamakla birlikte timestamp long olarak gönderilir
        }, {
            headers: {
                'x-agentname': process.env.TRENDYOL_AGENT_NAME,
                'x-executor-user': process.env.TRENDYOL_EXECUTOR_USER
            }
        });

        if (trendyolResponse.status === 200) {
            return res.status(200).json({ message: 'Order status updated and notified successfully' });
        } else {
            return res.status(trendyolResponse.status).json({ message: 'Failed to notify Trendyol' });
        }
    } catch (error) {
        console.error('Error taking order:', error);
        res.status(500).json({ message: 'An unexpected error occurred while taking the order.' });
    }
};
