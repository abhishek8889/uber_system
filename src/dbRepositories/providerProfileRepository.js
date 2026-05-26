const {MAX_DISTANCE_RADIUS} = require("../constants/constants");
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
        const providers =  await ProviderProfile.aggregate([
            {
                $geoNear: {
                    near: { 
                        type: "Point",
                        coordinates: [Number(clientLongitude) , Number(clientLatitude)  ]
                    },
                    distanceField: "calculatedDistance",
                    spherical: true,
                    maxDistance: MAX_DISTANCE_RADIUS,

                    query: {
                        $or : [
                            {is_available: true },
                            {is_online: true}
                        ]
                    }
                },
            }
            ,{
                $match: {
                    $expr: {
                        $lte: ["$calculatedDistance", "$service_radius"]
                    }
                }
            } ,
            {
                $lookup: {
                    from: "users",
                    let: { userId: "$user_id" },

                    pipeline: [
                        {
                            $match: {
                                $expr: {
                                    $eq: ["$_id", "$$userId"]
                                }
                            }
                        },
                        {
                            $project: {
                                first_name: 1,
                                last_name: 1,
                                phone: 1,
                                profile_image: 1
                            }
                        }
                    ],

                    as: "user"
                }
            },
            {
                $unwind: "$user"
            }
        ]);

        return providers;
    } catch (error) {
        console.log("Error in searchProvidersForCustomer:", error);
        throw error;
    }
};

