const mongoose = require('mongoose');
const moment = require('moment');
const momentTz = require("moment-timezone");
const providerProfileRepository = require('../../dbRepositories/providerProfileRepository');
const constants = require('../../constants/constants');
const cloudinaryService = require('../cloudinary/cloudinaryService');
const ProviderProfile = require("../../modals/ProviderProfile");
const User = require("../../modals/User");


exports.searchProvider = async (reqData) => {
    const { latitude , longitude , service , requirement , category} = reqData;
    try{
        // const serachedProviders =  await providerProfileRepository.searchProvidersForCustomer(latitude, longitude ,service , requirement , category);
        
        //  Query Learn Here

        // const searchedProviders = await ProviderProfile.find({

        // });

        // const user  = await User.find({
        //     first_name : "Abhisadfek",
        //     last_name : "Sarma"
        // });

        mongoose.set("debug", true);

        const user  = await User.find({
            $or : [
                { 
                    // $and : [
                    //     { first_name : {$eq : "Inderpreet"} }  ,
                    //     { locale : "en"}
                    // ] 
                    first_name : {$eq : "Inderpreet"} ,
                    locale : "en"
                }
                ,
                {
                    last_name : "Sarma" ,
                    phone : { $ne : "+917696127131"}
                },
                {
                    $expr: {
                        $ne: ["$first_name", "$last_name"]
                    }
                }
            ] 
        }).sort({ createdAt : -1 }).limit(2);

        return user;

        // return serachedProviders;
    } catch (error) {
        throw error;
    }
};


exports.uploadImage= async (image ,uploadArea = 'cloudinary')  => {
    try{
        const uploadArea =  constants.FILE_UPLOAD_AREA ;
        
        const fileName = `${Date.now()}`;

        const filePath = `${uploadArea}/${fileName}`;

        const imageResult = await cloudinaryService.uploadImage(image.tempFilePath , fileName);
        
        return {
            'secure_url' : imageResult?.secure_url ?? null ,
            'public_id' : imageResult?.public_id ?? null ,
            'formats' : imageResult?.format ?? null
        };

    } catch (error) {
        throw error;
    }
}


// exports.uploadImage= async (image ,uploadArea = 'cloudinary')  => {
//     try{
//         const uploadArea =  constants.FILE_UPLOAD_AREA ;
        
//         const fileName = `${Date.now()}_${image.name}`;

//         const filePath = `${uploadArea}/${fileName}`;
//         const imageResult = await image.mv(filePath , function(err){
//             if(err){
//                 throw err;
//             }
//             return filePath;
//         });
//         return filePath;
//     } catch (error) {
//         throw error;
//     }
// }