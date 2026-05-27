const { body } = require('express-validator');
const { VERIFICATION_TOKEN_TYPE } = require('../../constants/enums');


exports.validateUploadImage = () => {
    return [
        body('image').custom((value, { req }) => {
            if (!req.files || !req.files.image) {
                throw new Error('validation.image_required');
            }
            return true;
        })
    ];
}