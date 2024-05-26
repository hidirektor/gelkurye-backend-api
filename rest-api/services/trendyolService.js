const axios = require('axios');
const Users = require('../models/User');
const Merchants = require('../models/Merchants');
const MerchantsAPI = require('../models/MerchantsAPI');
const Orders = require('../models/Order');

async function fetchAndSaveOrders() {
    try {
        const merchants = await Users.findAll({ where: { userType: 'MERCHANT' } });

        for (const merchant of merchants) {
            const merchantDetails = await Merchants.findOne({ where: { userID: merchant.userID } });
            if (!merchantDetails) continue;

            const merchantAPI = await MerchantsAPI.findOne({ where: { merchantID: merchantDetails.merchantID } });
            if (!merchantAPI) continue;

            const trendyolResponse = await axios.get('https://api.trendyol.com/sapigw/suppliers/' + merchantAPI.trendyolSupplierID + '/orders', {
                headers: {
                    'Authorization': 'Basic ' + Buffer.from(merchantAPI.trendyolAPIKey + ':' + merchantAPI.trendyolAPISecretKey).toString('base64')
                }
            });

            const orders = trendyolResponse.data.content;

            for (const order of orders) {
                if (order.status !== 'Awaiting') continue;

                await Orders.create({
                    merchantID: merchantDetails.merchantID,
                    marketplaceName: 'Trendyol',
                    marketplaceOrderID: order.id,
                    isPaid: order.paid,
                    orderStatus: order.status,
                    customerNameSurname: order.customerFirstName + ' ' + order.customerLastName,
                    customerPhoneNumber: order.customerPhone,
                    customerAddress: order.deliveryAddress.address,
                    otpType: 'sms',
                    otpCode: order.packageNumber,
                    otpTime: Math.floor(Date.now() / 1000),
                    courierReceived: false // Yeni alan
                });
            }
        }
    } catch (error) {
        console.error('Error fetching and saving orders:', error);
    }
}

module.exports = { fetchAndSaveOrders };