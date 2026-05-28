const mongoose = require('mongoose');
const serviceNotificationSchema = new mongoose.Schema(
    {
        service_request_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ServiceRequest",
            required: true
        },
        provider_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        customer_id : {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        customer_quotation : { // Price set by Customer
            type: Number,
            default: 0
        },
        provider_quotation : { // Price set by Provider
            type: Number,
            default: 0
        }, 
        status: {
            type: String,
            enum: ["pending", "accepted", "rejected", "completed"],
            default: "pending"
        },
        is_seen : {
            type : String,
            enum : [true , false] ,
            default : false
        }
    },
    {
        timestamps: true
    }
);

const ServiceNotification = mongoose.model("ServiceNotification", serviceNotificationSchema ,'service_notifications' );

module.exports = ServiceNotification;