const VerificationToken = require('../modals/VerificationTokens');

exports.createRecord = async (data) => {
    return await VerificationToken.create(data);
};

