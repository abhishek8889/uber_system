
const moment = require('moment');
const userRepository = require('../../dbRepositories/userRepository');
const verificationTokensRepository = require('../../dbRepositories/verificationTokensRepository');
const { generateRandomString } = require('../../utils/helper');
const twilioService = require('../twilio/twilio');
const { VERIFICATION_TOKEN_TYPE } = require('../../constants/enums');


exports.register = async (reqData) => {
    const { first_name, last_name, phone ,type } = reqData;

    const existingUser = await userRepository.findUserByPhone(phone);
    if (existingUser) {
        const error = new Error('error.user_already_exists');
        error.statusCode = 409;
        throw error;
    }

    const user = await userRepository.createUser({ first_name, last_name, phone });

    otp = generateRandomString(6).toUpperCase();
   
    const tokenSaveResp = await verificationTokensRepository.createRecord({
        user_id : user.id ,
        type : VERIFICATION_TOKEN_TYPE.REGISTER ,
        token : otp ,
        expired_at : moment.utc().add(10, 'minutes').toDate()
    });

    const otpBody = `Hello ${first_name}, welcome to Uber System App! Your OTP for account verification is ${otp}. This code is valid for a limited time. Please do not share it with anyone.`;
    const sendOtp = twilioService.sendMessageFromTwilio(phone ,otpBody);

    if(!sendOtp){
        const error = new Error('error.error_in_sending_verification_otp');
        error.statusCode = 400;
        throw error;
    }

    return user;
};


