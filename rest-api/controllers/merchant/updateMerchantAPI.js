const MerchantService = require('../../services/merchantService');
const Merchants = require('../../models/Merchants');
const CustomError = require('../../utils/customError');

module.exports = async (req, res) => {
    const { phoneNumber, userID, 'marketplace-API': marketplaceAPI } = req.body;

    try {
        // Check if the merchant exists
        const merchant = await Merchants.findOne({ where: { userID, contactNumber: phoneNumber } });
        if (!merchant) {
            throw new CustomError('Merchant not found', 404);
        }
        const merchantID = merchant.merchantID;

        // Update Trendyol API details if provided
        if (marketplaceAPI.trendyolSupplierID || marketplaceAPI.trendyolAPIKey || marketplaceAPI.trendyolAPISecretKey) {
            await MerchantService.updateTrendyolAPI(merchantID, {
                supplierID: marketplaceAPI.trendyolSupplierID,
                apiKey: marketplaceAPI.trendyolAPIKey,
                apiSecretKey: marketplaceAPI.trendyolAPISecretKey
            });
        }

        // Update Getir Yemek API details if provided
        if (marketplaceAPI.getirYemekMerchantToken) {
            await MerchantService.updateGetirYemekAPI(merchantID, marketplaceAPI.getirYemekMerchantToken);
        }

        // Update Yemeksepeti API details if provided
        if (marketplaceAPI.yemekSepetiUsername || marketplaceAPI.yemekSepetiPassword) {
            await MerchantService.updateYemekSepetiAPI(merchantID, {
                username: marketplaceAPI.yemekSepetiUsername,
                password: marketplaceAPI.yemekSepetiPassword
            });
        }

        res.status(200).json({ message: 'Marketplace API details updated successfully' });
    } catch (error) {
        res.status(error.status || 500).json({ message: error.message || 'An unexpected error occurred' });
    }
};