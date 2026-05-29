const mongoose = require('mongoose');
const moment = require('moment');
const momentTz = require("moment-timezone");
const providerProfileRepository = require('../../dbRepositories/providerProfileRepository');
const constants = require('../../constants/constants');
const cloudinaryService = require('../cloudinary/cloudinaryService');
const ProviderProfile = require("../../modals/ProviderProfile");
const User = require("../../modals/User");
const serviceRequestRepository = require('../../dbRepositories/serviceRequestRepository');
const serviceNotificationRepository = require('../../dbRepositories/serviceNotificationRepository');
const { SERVICE_REQUEST_STATUS } = require('../../constants/enums');
const { returnError } = require('../../utils/responseHandler');

exports.searchProvider = async (reqData) => {
    const { latitude , longitude , service , requirement , category , customer_quotation , customer_id} = reqData;
    try{
        // ######### Check already pending request ################

        const pendingRequest = await serviceRequestRepository.findOne({
            customer_id: customer_id,
            status : SERVICE_REQUEST_STATUS.PENDING
        });

        if(pendingRequest){
            returnError("error.you_have_already_a_pending_request" , 400);
        }

        //  ############## Send Notification to the searched providers ##############
        const saveServiceRequest = await serviceRequestRepository.createServiceRequest({
            customer_id : customer_id ,
            customer_location : {
                type : "Point" ,
                coordinates : [longitude , latitude]
            },
            requirement : requirement ,
            service : service ,
            category : category,
            customer_quotation : reqData.customer_quotation
        } , null);

        // #############  BACKGROUND PROCESS  ###############        
        process.nextTick(async () => {
            try {
                //  ########## Search Providers ###############
                const providers = await providerProfileRepository
                    .searchProvidersForCustomer(
                        latitude,
                        longitude,
                        service,
                        requirement,
                        category
                    );

                if ( !providers || providers.length === 0 ) {
                    return;
                }

                // ########## Prepare Notifications ###############

                const notifications = providers.map(provider => ({
                    service_request_id: saveServiceRequest[0]._id,
                    provider_id: provider.user_id,
                    customer_id : customer_id,
                    customer_quotation : customer_quotation,
                    status: SERVICE_REQUEST_STATUS.PENDING,
                    is_seen: false
                }));

                // ############ BULK INSERT NOTIFICATIONS ##############
                
                const notificationRecord = await serviceNotificationRepository.insertMany(notifications);
            } catch (error) {
                // console.error("Background Provider Search Error:",error);
            }
        });

        return saveServiceRequest;
    } catch (error) {
        throw error;
    }
};


exports.cancelServiceRequest = async (reqData) => {
    
    const session = await mongoose.startSession();
    session.startTransaction();

    try{
        const {user_id} = reqData;

        const pendingReqExist = await serviceRequestRepository.findOne({
            $or : [
                {customer_id : user_id},
                {provider_id : user_id}
            ] ,
            status : SERVICE_REQUEST_STATUS.PENDING
        });

        if(!pendingReqExist){
            returnError("error.there_is_no_pending_req_to_cancel" ,400);
        }

        const serviceRequest = await serviceRequestRepository.updateOne(
            {
                $or : [
                    {customer_id : user_id},
                    {provider_id : user_id}
                ] ,
                status : SERVICE_REQUEST_STATUS.PENDING
            } , 
            {
                status : SERVICE_REQUEST_STATUS.REJECTED
            } , session);

        await session.commitTransaction();

        return serviceRequest;
    }catch (error) {
        await session.abortTransaction();
        throw error;
    }finally {
        session.endSession();
    }
}

// exports.acceptServiceRequest = async (providerId , customerId , customerLocation , requirement , service) => {

// };

exports.providerRequestResponse = async (reqData) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try{
        return "Prvoider request response";


        await session.commitTransaction();
        // return serviceRequest;
    }catch (error) {
        await session.abortTransaction();
        throw error;
    }finally {
        session.endSession();
    }
}

exports.uploadImage= async (image ,uploadArea = 'cloudinary')  => {
    try{
        const uploadArea =  constants.FILE_UPLOAD_AREA ;
        
        const fileName = `${Date.now()}`;

        const filePath = `${uploadArea}/${fileName}`;

        const imageResult = await cloudinaryService.uploadImage(image.tempFilePath , fileName);
        
        return {
            'secure_url' : imageResult?.secure_url ?? null ,
            'public_id' : imageResult?.public_id ?? null ,
            'formats' : imageResult?.format ?? null
        };

    } catch (error) {
        throw error;
    }
}
