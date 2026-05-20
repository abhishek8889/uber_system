const express = require('express');
const router = express.Router();
const authController = require('../../controllers/auth/authController');
const {validateRegister} = require('../../requestValidatations/auth/authValidations');
const validate = require('../../middlewares/validationHandler');

router.post('/register',validateRegister(),validate,authController.register);
router.post('/provider-register',validateRegister(),validate,authController.providerRegister);

module.exports = router;