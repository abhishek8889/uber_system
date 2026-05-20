const { body } = require('express-validator');
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


module.exports = {
    validateRegister,
};