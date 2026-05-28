const ServiceRequest = require('../modals/ServiceRequest');

exports.createServiceRequest = async (serviceRequestData , session = null) => {
    try {
        const createdServiceRequest = await ServiceRequest.create([serviceRequestData] , { session });
        return createdServiceRequest;
    } catch (error) {
        throw error;
    }
}

exports.findOne = async(condition) => {
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


// exports.upsertProviderProfile = async (filter, data , session = null) => {
//     const record = await ProviderProfile.findOneAndUpdate(
//         filter,
//         data,
//         {   
//             upsert: true,
//             new: true ,
//             session
//         }
//     );
//     return record;
// }
