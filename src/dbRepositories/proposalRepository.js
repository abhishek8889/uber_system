const mongoose = require('mongoose');
const Proposal = require('../modals/Proposal');

exports.create = async (data , session = null) => {
    try{
        const [proposal] = await Proposal.create([data], session ? { session } : {});
        return proposal;
    }catch(error){
        throw error;
    }
}


exports.findOne = async (data ) => {
    try{
        const record = await Proposal.findOne(data);
        return record;
    } catch(error) {
        throw error;
    }
};
