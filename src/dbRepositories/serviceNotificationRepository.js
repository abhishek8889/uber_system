const ServiceNotification = require('../modals/ServiceNotification');


exports.insertMany = async (reqData , session = null) => {
    try {
        const notification = await ServiceNotification.insertMany(reqData , { session });
        return notification;
    } catch (error) {
        throw error;
    }
}