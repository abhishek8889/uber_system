const ProviderProfile = require("../modals/ProviderProfile");

exports.upsertProviderProfile = async (filter, data , session = null) => {
    const record = await ProviderProfile.findOneAndUpdate(
        filter,
        data,
        {   
            upsert: true,
            new: true ,
            session
        }
    );
    return record;
}


