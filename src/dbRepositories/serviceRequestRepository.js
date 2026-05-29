const { MAX_DISTANCE_RADIUS } = require('../constants/constants');
const { SERVICE_REQUEST_STATUS } = require('../constants/enums');
const ServiceRequest = require('../modals/ServiceRequest');

exports.createServiceRequest = async (serviceRequestData , session = null) => {
    try {
        const createdServiceRequest = await ServiceRequest.create([serviceRequestData] , { session });
        return createdServiceRequest;
    } catch (error) {
        throw error;
    }
}

exports.findOne = async (condition) => {
    try {
        const serviceRequest = await ServiceRequest.findOne(condition);
        return serviceRequest;
    } catch (error) {
        throw error;
    }
}

exports.findOneAndUpdate = async(filter , data , session = null) => {
    const record = await ServiceRequest.findOneAndUpdate(
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



exports.updateOne = async(filter , data , session = null) => {
    const record = await ServiceRequest.updateOne(
        filter,
        data,
        {   
            session
        }
    );

    return record;
}

exports.searchServiceRequest = async(filter) => {
    try{
        const {longitude, latitude, service_categories, service_radius} = filter; 

        let geoNearQuery = {
            status : SERVICE_REQUEST_STATUS.PENDING
        };

        if (Array.isArray(service_categories) && service_categories.length > 0) {
            const escapedKeywords = service_categories
                .map(cat => cat.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'))
                .join('|');

            geoNearQuery.$or = [
                {requirement :  { $regex: `\\b(${escapedKeywords})`, $options: 'i' } },
                {service :  { $regex: `\\b(${escapedKeywords})`, $options: 'i' } },
                {category :  { $regex: `\\b(${escapedKeywords})`, $options: 'i' } },
            ]
        }


        const record = await ServiceRequest.aggregate([
            {
                $geoNear: {
                    near: { 
                        type: "Point",
                        coordinates: [Number(longitude) , Number(latitude)  ]
                    },
                    key: "customer_location",  
                    distanceField: "calculatedDistance",
                    maxDistance: service_radius ?? MAX_DISTANCE_RADIUS,
                    spherical: true ,
                    query : geoNearQuery
                }
            }
        ]);

        return record;
    }catch(error){
        throw error;
    }
}