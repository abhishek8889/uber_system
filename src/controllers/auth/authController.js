const { successResponse, errorResponse } = require('../../utils/responseHandler');
const messages = require('../../constants/messages');
const authService = require('../../services/auth/authService');
const mongoose = require('mongoose');
const { VERIFICATION_TOKEN_TYPE, USER_ROLE_TYPES } = require('../../constants/enums');


exports.register = async (req, res) => {
    try {
        const user = await authService.register(req.body);
        return res.status(201).json(successResponse(req.t('success.record_created'), user));
    } catch (error) {
        const status = error.statusCode || 500;
        const message = error.statusCode
            ? req.t(error.message)
            : req.t('error.something_went_wrong');

        return res.status(status).json(errorResponse(message, req.t(error.message)));
    }
};


exports.providerRegister = async (req, res) => {
    try {
        const user = await authService.register({
            ...req.body,
            role: USER_ROLE_TYPES.PROVIDER,
            timezone: req.get("X-Timezone")
        });
        return res.status(201).json(successResponse(req.t('success.record_created'), user));
    } catch (error) {
        const status = error.statusCode || 500;
        const message = error.statusCode
            ? req.t(error.message)
            : req.t('error.something_went_wrong');

        return res.status(status).json(errorResponse(message, req.t(error.message)));
    }
};

//  ####### Provider Login ############

exports.sendLoginOtp = async(req, res) => {
    try {
        const resp = await authService.sendLoginOtp(req.body);

        return res.status(200).json(successResponse(req.t('success.login_otp_sent'), resp));
    } catch (error) {
        const status = error.statusCode || 500;
        const message = error.statusCode
            ? req.t(error.message)
            : req.t('error.something_went_wrong');

        return res.status(status).json(errorResponse(message, req.t(error.message)));
    }
}


exports.verifyOtp = async (req, res) => {
    try {
        const user = await authService.verifyOtp(req.body);
        return res.status(200).json(successResponse(req.t('success.otp_verified'), user));
    } catch (error) {
        const status = error.statusCode || 500;
        const message = error.statusCode
            ? req.t(error.message)
            : req.t('error.something_went_wrong');

        return res.status(status).json(errorResponse(message, req.t(error.message)));
    }
};

//  ############## CUSTOMER SIGNUP #############

exports.customerRegister = async (req, res) => {
    try {
        const user = await authService.register({
            ...req.body,
            role: USER_ROLE_TYPES.CUSTOMER,
            timezone: req.get("X-Timezone")
        });

        return res.status(201).json(successResponse(req.t('success.record_created'), user));
    } catch (error) {
        const status = error.statusCode || 500;
        const message = error.statusCode
            ? req.t(error.message)
            : req.t('error.something_went_wrong');  
    }
}

//  ########### Provider Profile Update ############

exports.providerProfileUpdate = async (req, res) => {
    try {
        const resp = await authService.providerProfileUpdate({
            ...req.body,
            user_id : req.user._id
        });

        return res.status(200).json(successResponse(req.t('success.profile_updated'), resp));
    } catch (error) {
        const status = error.statusCode || 500;
        const message = error.statusCode
            ? req.t(error.message)
            : req.t('error.something_went_wrong');

        return res.status(status).json(errorResponse(message, req.t(error.message)));
    }
};

