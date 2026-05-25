const mongoose = require('mongoose');
const moment = require('moment');
const momentTz = require("moment-timezone");
const providerProfileRepository = require('../../dbRepositories/providerProfileRepository');

exports.searchProvider = async (reqData) => {
    const { latitude , longitude , service , requirement } = reqData;
    try{
        
        const serachedProviders =  await providerProfileRepository.searchProvidersForCustomer(latitude, longitude);
        return searchedProviders;
    } catch (error) {
        throw error;
    }
};


