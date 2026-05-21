const User = require('../modals/User');

exports.createUser = async (data, session = null) => {
    const [user] = await User.create([data], session ? { session } : {});
    return user;
};

exports.findUserByPhone = async (phone) => {
    return await User.findOne({ phone });
};

exports.findUserById = async (id) => {
    return await User.findById(id);
};


exports.findByIdAndUpdate = async (id, data, session = null) => {
    const user = await User.findByIdAndUpdate(
        id,
        data,
        { 
            new: true ,
            session
        }
    );
    return user;
};

