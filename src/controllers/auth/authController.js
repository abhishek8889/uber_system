const { successResponse, errorResponse } = require('../../utils/responseHandler');
const messages = require('../../constants/messages');
const authService = require('../../services/auth/authService');
const mongoose = require('mongoose');

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
            type: 'provider'
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
