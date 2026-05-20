const envVariables = require('../../config/envVariables');
const twilio = require('twilio');

const client = twilio(
  envVariables.TWILIO_ACCOUNT_SID,
  envVariables.TWILIO_AUTH_TOKEN
);

const sendMessageFromTwilio = async (to ,body) => {
    try {
        if (!to) {
        throw new Error("Phone number is required");
        }

        const message = await client.messages.create({
            body: body || `Hello from ${envVariables.APP_NAME}`,
            from: envVariables.TWILIO_PHONE_NUMBER,
            to: to
        });

        console.log("Message sent:", message.sid);

        return message;
    } catch (error) {
        console.error("Twilio Error:", error.message);
        throw error;
    }
}

module.exports = {
    sendMessageFromTwilio
}