const mongoose = require('mongoose');
const { generateRandomString } = require('../utils/helper');
const { USER_ROLE_TYPES, LOCALE_TYPE } = require('../constants/enums');


const userSchema = new mongoose.Schema(
    {
        first_name: { type: String, required: true, trim: true },
        last_name:  { type: String, required: true, trim: true },
        profile_image: { type: String, default: "" },
        phone:      { type: String, required: true, unique: true, trim: true },
        username : {
            type : String,
            unique : true,
        },
        otp_verfication : {
            type : Boolean,
            default : false
        },
        role : {
            type : String,
            enum: Object.values(USER_ROLE_TYPES) ,
            required : true
        },
        locale : {
            type : String,
            enum: Object.values(LOCALE_TYPE) ,
            default : LOCALE_TYPE.ENGLISH
        },
        timezone : {
            type : String,
            required : true
        },
        status : {
            type : String ,
            default : 'in_active'
        } 
    },
    { timestamps: true }
);


// asdfds

// ########### Username generator ###########
userSchema.pre('save', async function () {
    if (this.isNew && !this.username) {
        let username;
        let exists = true;

        while (exists) {
            username = `${this.first_name.toUpperCase()}_${generateRandomString(5)}`;
            exists = await this.constructor.findOne({ username });
        }
        this.username = username;
    }
});

module.exports = mongoose.model('User', userSchema);
