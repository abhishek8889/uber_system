const { validationResult } = require('express-validator');
const i18n = require('../config/i18n');

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const translatedErrors = errors.array().map(err => ({
      ...err,
      msg: req.t(err.msg), // translate the message key
    }));

    return res.status(422).json({ errors: translatedErrors });
  }
  next();
};