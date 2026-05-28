const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');
const {validateRegister, validateVerifyOtp, validateSendLoginOtp} = require('../../requestValidatations/auth/authValidations');
const validate = require('../../middlewares/validationHandler');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { USER_ROLE_TYPES } = require('../../constants/enums');

// ############## Authentication Routes #############
router.post('/register',validateRegister(),validate,authController.register);
router.post('/provider-register',validateRegister(),validate,authController.providerRegister);
router.post('/customer-register',validateRegister(),validate,authController.customerRegister);
router.post('/send-login-otp',validateSendLoginOtp(),validate,authController.sendLoginOtp);
router.post('/verify-otp',validateVerifyOtp(),validate,authController.verifyOtp);

// ############## Provider Profile Update #############
router.post('/provider-profile-update',authMiddleware(USER_ROLE_TYPES.PROVIDER),validate,authController.providerProfileUpdate);




//  ##############  MAIN SERVICE ROUTES #############



module.exports = router;