const User = require('../modals/User');
const ProviderProfile = require('../modals/ProviderProfile')

exports.createUser = async (data, session = null) => {
    const [user] = await User.create([data], session ? { session } : {});
    return user;
};

exports.findUserByPhone = async (phone) => {
    return await User.findOne({ phone });
};

exports.findUserById = async (id) => {
    return await User.findById(id);
};


exports.findByIdAndUpdate = async (id, data, session = null) => {
    const user = await User.findByIdAndUpdate(
        id,
        data,
        { 
            new: true ,
            session
        }
    );
    return user;
};


exports.userDetailsById = async (id ,role = null) => {
    try{
        matchData = {
            _id : id
        }

        if(role != null) {
            matchData = {...matchData , role}
        }

        const result  = await User.aggregate([
            {
                $match : matchData
            },
            {
                $lookup : {
                    from : "provider_profiles",
                    localField : "_id" ,
                    foreignField : "user_id" ,
                    as : "provider_profile"
                }
            },
            {
                $unwind: {
                    path: "$provider_profile",
                    preserveNullAndEmptyArrays: true
                }
            } ,
            {
                $project : {
                    _id : 1 ,
                    first_name : 1 ,
                    last_name : 1 ,
                    role : 1 ,
                    "provider_profile.user_id" : 1 , 
                    "provider_profile.location" : 1 , 
                    "provider_profile.service_categories" : 1 , 
                    "provider_profile.service_radius" : 1 
                }
            }
        ]);

        return result;
    }catch(error) {
        throw error;
    }
}
