require('dotenv').config();

module.exports = {
    PORT : process.env.PORT,
    APP_NAME : process.env.APP_NAME,
    TWILIO_ACCOUNT_SID : process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN : process.env.TWILIO_AUTH_TOKEN ,
    MONGODB_URI : process.env.MONGODB_URI,
    TWILIO_PHONE_NUMBER : process.env.TWILIO_PHONE_NUMBER,
    JWT_SECRET : process.env.JWT_SECRET,
}