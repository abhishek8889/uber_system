const User = require('../modals/User');

exports.createUser = async (data) => {
    return await User.create(data);
};

exports.findUserByPhone = async (phone) => {
    return await User.findOne({ phone });
};

exports.findUserById = async (id) => {
    return await User.findById(id);
};
