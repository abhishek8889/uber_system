const { body } = require('express-validator');
const { VERIFICATION_TOKEN_TYPE } = require('../../constants/enums');
const validateRegister = () => {
    return [
        body('first_name').notEmpty().withMessage('validation.first_name_required')
            .isLength({ min: 2 , max:30 }).withMessage('validation.first_name_length'),
        body('last_name').notEmpty().withMessage('validation.last_name_required')
            .isLength({ min: 2 , max:30}).withMessage('validation.last_name_length'),
        body('phone').notEmpty().withMessage('validation.phone_required')
            .isNumeric().withMessage('validation.phone_invalid')
            .isLength({ min: 10, max: 15 }).withMessage('validation.phone_valid_length'),
    ];
}   

const validateVerifyOtp = () => {
    return [
        body('user_id').notEmpty().withMessage('validation.user_id_required'),
        body('otp').notEmpty().withMessage('validation.otp_required')
            .isLength({ min: 6, max: 6 }).withMessage('validation.otp_length'),
        body('type').notEmpty().withMessage('validation.otp_verification_type_required')
            .isIn([VERIFICATION_TOKEN_TYPE.LOGIN, VERIFICATION_TOKEN_TYPE.REGISTER]).withMessage('validation.otp_verification_type_invalid')
    ];
}   


const validateSendLoginOtp = () => {
    return [
        body('phone').notEmpty().withMessage('validation.phone_required')
    ];
}   



module.exports = {
    validateRegister,
    validateVerifyOtp,
    validateSendLoginOtp
};
      