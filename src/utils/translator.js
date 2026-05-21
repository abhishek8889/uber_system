const i18n = require('../config/i18n');

exports.translate = (key, params = {}, lng = 'en') => {
  try {
    return i18n.t(key, { ...params, lng });
  } catch (err) {
    return '';
  }
};
