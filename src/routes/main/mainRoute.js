const express = require('express');
const router = express.Router();
const mainController = require('../../controllers/main/mainController');

const validate = require('../../middlewares/validationHandler');
const { authMiddleware } = require('../../middlewares/authMiddleware');

//  ##############  MAIN SERVICE ROUTES #############
router.get('/search-provider', authMiddleware, validate, mainController.searchProvider);


module.exports = router;