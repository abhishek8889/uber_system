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


exports.searchProvidersByService = async () => {
    
}

exports.searchProvidersForCustomer = async (
    clientLatitude,
    clientLongitude
) => {
    try {
        const providers = await ProviderProfile.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point",
                        coordinates: [clientLongitude, clientLatitude] // [lng, lat]
                    },
                    distanceField: "distance",
                    spherical: true,
                    key: "location"
                    // maxDistance: 10000 // optional
                }
            },
            {
                $match: {
                    is_online: true,
                    is_available: true,
                    $expr: {
                        $lte: ["$distance", "$service_radius"]
                    }
                }
            },
            {
                $lookup: {
                    from: "users", // actual Mongo collection name
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: {
                    path: "$user",
                    preserveNullAndEmptyArrays: false
                }
            },
            {
                $project: {
                    _id: 1,
                    user_id: 1,
                    distance: 1,
                    service_radius: 1,
                    rating: 1,
                    service_categories: 1,
                    "user._id": 1,
                    "user.first_name": 1,
                    "user.last_name": 1,
                    "user.email": 1
                }
            }
        ]);

        return providers;
    } catch (error) {
        throw error;
    }
};

