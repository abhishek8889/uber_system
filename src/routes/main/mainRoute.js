const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/main/mainController');

const validate = require('../../middlewares/validationHandler');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { validateUploadImage } = require('../../requestValidatations/main/mainValidations');
const { USER_ROLE_TYPES } = require('../../constants/enums');

//  ##############  MAIN SERVICE ROUTES #############
router.get('/search-provider', authMiddleware(USER_ROLE_TYPES.CUSTOMER), validate, mainController.searchProvider);
router.post('/cancel-service-request', authMiddleware(USER_ROLE_TYPES.CUSTOMER , USER_ROLE_TYPES.PROVIDER ), validate, mainController.cancelServiceRequest);
router.post('/upload-image', authMiddleware(), validateUploadImage() ,validate , mainController.uploadImage);
router.post('/provider-request-response', authMiddleware(USER_ROLE_TYPES.PROVIDER) ,validate , mainController.providerRequestResponse);


module.exports = router;