const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/main/mainController');

const validate = require('../../middlewares/validationHandler');
const { authMiddleware } = require('../../middlewares/authMiddleware');
const { validateUploadImage } = require('../../requestValidatations/main/mainValidations');

//  ##############  MAIN SERVICE ROUTES #############
router.get('/search-provider', authMiddleware, validate, mainController.searchProvider);
router.post('/upload-image', authMiddleware, validateUploadImage() ,validate , mainController.uploadImage);


module.exports = router;