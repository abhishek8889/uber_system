const VerificationToken = require('../modals/VerificationTokens');

exports.createRecord = async (data, session = null) => {
    const [record] = await VerificationToken.create([data], session ? { session } : {});
    return record;
};

exports.findOneAndDelete = async (data , session = null) => {
    const record = await VerificationToken.findOneAndDelete(data, session ? { session } : {});
    return record;
};

exports.upsertToken = async (filter ,data , session = null) => {
    const record = await VerificationToken.findOneAndUpdate(
        filter,
        data,
        {   
            upsert: true,
            new: true ,
            session
        }
    );
    return record;
};



exports.findOne = async (data ) => {
    const record = await VerificationToken.findOne(data);
    return record;
};
