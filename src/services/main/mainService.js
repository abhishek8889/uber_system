const mongoose = require('mongoose');
const moment = require('moment');
const momentTz = require("moment-timezone");





exports.searchProvider = async (reqData) => {
    const { first_name, last_name, phone, role, timezone } = reqData;
    try{

    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
};


