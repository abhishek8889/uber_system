const { successResponse, errorResponse } = require('../../utils/responseHandler');
const messages = require('../../constants/messages');
const mainService = require('../../services/main/mainService');
const mongoose = require('mongoose');
const { VERIFICATION_TOKEN_TYPE, USER_ROLE_TYPES } = require('../../constants/enums');


exports.searchProvider = async (req, res) => {
    try {
        const resp = await mainService.searchProvider(req.body);
        return res.status(200).json(successResponse(req.t('success.record_found'), resp));
    } catch (error) {
        const status = error.statusCode || 500;
        const message = error.statusCode
            ? req.t(error.message)
            : req.t('error.something_went_wrong');

        return res.status(status).json(errorResponse(message, req.t(error.message)));
    }
};