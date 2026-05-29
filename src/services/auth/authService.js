const mongoose = require('mongoose');
const moment = require('moment');
const momentTz = require("moment-timezone");
const jwt = require('jsonwebtoken');



const userRepository = require('../../dbRepositories/userRepository');
const providerProfileRepository = require('../../dbRepositories/providerProfileRepository');
const verificationTokensRepository = require('../../dbRepositories/verificationTokensRepository');
const { generateRandomString } = require('../../utils/helper');
const translator = require('../../utils/translator');
const twilioService = require('../twilio/twilio');
const { VERIFICATION_TOKEN_TYPE, STATUS } = require('../../constants/enums');




exports.register = async (reqData) => {
    const { first_name, last_name, phone, role, timezone } = reqData;

    if (!momentTz.tz.zone(timezone)) {
        const error =  new Error("error.invalid_timezone");
        error.statusCode = 400;
        throw error;
    }

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const existingUser = await userRepository.findUserByPhone(phone);

        if (existingUser) {
            const error = new Error('error.user_already_exists');
            error.statusCode = 409;
            throw error;
        }
        
        const user = await userRepository.createUser({ first_name, last_name, phone ,role, timezone }, session);
        
        const otp = generateRandomString(6).toUpperCase();

        const lang = reqData.lang || 'en';

        await verificationTokensRepository.createRecord({
            user_id: user.id,
            type: VERIFICATION_TOKEN_TYPE.REGISTER,
            token: otp,
            expired_at: moment.utc().add(10, 'minutes').toDate(),
        }, session);

        const otpBody = translator.translate('message.verify_otp', { first_name, otp });

        const sendOtp = await twilioService.sendMessageFromTwilio(phone, otpBody);
        if (!sendOtp) {
            const error = new Error('error.error_in_sending_verification_otp');
            error.statusCode = 400;
            throw error;
        }

        await session.commitTransaction();
        return user;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};




exports.sendLoginOtp = async (reqData) => {
    const { phone, role } = reqData;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await userRepository.findUserByPhone(phone);

        if (!user || user.role !== role) {
            const error = new Error('error.user_not_found');
            error.statusCode = 404;
            throw error;
        }
        
        const otp = generateRandomString(6).toUpperCase();

        await verificationTokensRepository.upsertToken(
            {
                user_id: user.id ,
                type: VERIFICATION_TOKEN_TYPE.LOGIN
            } ,
            {
                token: otp,
                expired_at: moment.utc().add(10, 'minutes').toDate()
            }, session);

        const otpBody = translator.translate('message.login_verify_otp', { first_name: user.first_name, otp });

        const sendOtp = await twilioService.sendMessageFromTwilio(phone, otpBody);
        if (!sendOtp) {
            const error = new Error('error.error_in_sending_verification_otp');
            error.statusCode = 400;
            throw error;
        }

        await session.commitTransaction();
        return user;

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};

exports.verifyOtp = async (reqData) => {
    const { user_id , otp , type } = reqData;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const verification = await verificationTokensRepository.findOneAndDelete({
            user_id : user_id,
            type : type,
            token : otp ,
            expired_at: { $gt: moment.utc().toDate() }
        }, session);

        if(!verification){
            const error = new Error('error.invalid_or_expired_verification_token');
            error.statusCode = 400;
            throw error;
        }

        //  ############## UPDATE USER AND CREATE JWT TOKEN ################

        const updateInUser = {
            otp_verfication : true ,
            status : STATUS.ACTIVE ,
        };

        const user = await userRepository.findByIdAndUpdate(user_id , updateInUser , session);

        const token = jwt.sign(
            {
                userId: user._id,
                phone: user.phone,
                role: user.role ,
                username : user.username ,
                timezone : user.timezone ,
                locale : user.locale
            },
            process.env.JWT_SECRET
        );
        
        const otpBody = translator.translate('message.otp_verified_successfully');

        const sendOtp = await twilioService.sendMessageFromTwilio(user.phone, otpBody);
        if (!sendOtp) {
            const error = new Error('error.error_in_sending_verification_otp');
            error.statusCode = 400;
            throw error;
        }
        await session.commitTransaction();

        return {
            token : token ,
            user : user
        };

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};



//  ############## Provider Profile Update #############

exports.providerProfileUpdate = async (reqData) => {
  
    const { 
        first_name ,
        last_name ,
        profile_image ,
        location_name ,
        latitude ,
        longitude  ,
        service_radius  ,
        is_online  ,
        is_available  ,
        service_categories ,
        user_id
    } = reqData;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const updateInUser = Object.fromEntries(
            Object.entries(reqData).filter(
                ([key ,value]) => 
                    value !== undefined &&
                    value !== null &&
                    key !== 'user_id'
            )
        );

        if (updateInUser.latitude && updateInUser.longitude) {
            updateInUser.location = {
                type: "Point",
                coordinates: [
                    Number(updateInUser.longitude),
                    Number(updateInUser.latitude)
                ]
            };

            delete updateInUser.latitude;
            delete updateInUser.longitude;
        }

        if (updateInUser.service_radius) {
            updateInUser.service_radius = Number(updateInUser.service_radius);
        }
        
        const user = await userRepository.findByIdAndUpdate(user_id , updateInUser , session);

        const providerProfileData = await providerProfileRepository.upsertProviderProfile({ user_id: user_id }, updateInUser , session);

        await session.commitTransaction();
        
        return user;
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};