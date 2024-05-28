const axios = require('axios');
const Users = require('../models/User');
const Merchants = require('../models/Merchants');
const MerchantsAPI = require('../models/MerchantsAPI');
const Orders = require('../models/Order');

async function trendyolOrders() {
    try {
        const merchants = await Users.findAll({ where: { userType: 'MERCHANT' } });

        for (const merchant of merchants) {
            const merchantDetails = await Merchants.findOne({ where: { userID: merchant.userID } });
            if (!merchantDetails) continue;

            const merchantAPI = await MerchantsAPI.findOne({ where: { merchantID: merchantDetails.merchantID } });
            if (!merchantAPI) continue;

            const trendyolResponse = await axios.get('https://api.trendyol.com/sapigw/suppliers/' + merchantAPI.trendyolSupplierID + '/orders', {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(merchantAPI.trendyolAPIKey + ':' + merchantAPI.trendyolAPISecretKey).toString('base64'),
                    'x-agentname': process.env.TRENDYOL_AGENT_NAME,
                    'x-executor-user': process.env.TRENDYOL_EXECUTOR_USER
                }
            });

            const orders = trendyolResponse.data.content;

            for (const order of orders) {
                if (order.packageStatus === 'Cancelled') continue; // İptal edilen siparişleri atla

                await Orders.create({
                    merchantID: merchantDetails.merchantID,
                    marketplaceName: 'Trendyol',
                    marketplaceOrderID: order.id,
                    isPaid: order.payment.paymentType !== 'PAY_WITH_ON_DELIVERY',
                    orderStatus: 'Created',
                    customerNameSurname: `${order.customer.firstName} ${order.customer.lastName}`,
                    customerPhoneNumber: order.address.phone,
                    customerLatitude: order.address.latitude,
                    customerLongitude: order.address.longitude,
                    courierReceived: false,
                    otpType: 'Trendyol',
                    otpCode: null,
                    otpSentTime: null,
                    deliveryTime: null
                });
            }
        }
    } catch (error) {
        console.error('Error fetching and saving orders:', error);
    }
}

module.exports = { trendyolOrders };