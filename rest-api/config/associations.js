const Users = require('../models/Users');
const UserPreferences = require('../models/UserPreferences');
const UserDocuments = require('../models/UserDocuments');
const UserRating = require('../models/UserRating');
const UserLocation = require('../models/UserLocation');
const MerchantsOwner = require('../models/MerchantsOwner');
const MerchantsAPI = require('../models/MerchantsAPI');
const MerchantsOrders = require('../models/MerchantsOrders');
const Verification = require('../models/Verification');
const VerificationBike = require('../models/VerificationBike');
const VerificationOrder = require('../models/VerificationOrder');
const Merchants = require('../models/Merchants');
const System = require('../models/System');

// Users.userID > UserPreferences.userID
Users.hasOne(UserPreferences, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
UserPreferences.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > UserDocuments.userID
Users.hasOne(UserDocuments, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
UserDocuments.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > Merchants.userID
Users.hasOne(Merchants, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Merchants.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > MerchantsOwner.userID
Users.hasOne(MerchantsOwner, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
MerchantsOwner.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > UserRating.userID
Users.hasOne(UserRating, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
UserRating.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > Verification.userID
Users.hasOne(Verification, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
Verification.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > VerificationBike.userID
Users.hasOne(VerificationBike, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
VerificationBike.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > UserLocation.userID
Users.hasOne(UserLocation, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
UserLocation.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > VerificationOrder.userID
Users.hasOne(VerificationOrder, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
VerificationOrder.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > MerchantsAPI.userID
Users.hasOne(MerchantsAPI, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
MerchantsAPI.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });

// Users.userID > MerchantsOrders.userID
Users.hasOne(MerchantsOrders, { foreignKey: 'userID', sourceKey: 'userID', onUpdate: 'CASCADE', onDelete: 'CASCADE' });
MerchantsOrders.belongsTo(Users, { foreignKey: 'userID', targetKey: 'userID' });
