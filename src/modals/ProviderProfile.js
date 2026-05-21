const mongoose = require('mongoose');
const { generateRandomString } = require('../utils/helper');
const { USER_ROLE_TYPES, LOCALE_TYPE } = require('../constants/enums');


const providerProfileSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
        required: true
      },
      coordinates: {
        type: [Number],   // [longitude, latitude]
        required: true,
        validate: {
          validator: function (value) {
            return value.length === 2;
          },
          message: "Coordinates must have [longitude, latitude]"
        }
      }
    },

    service_radius: {
      type: Number,
      default: 10000, // meters
      min: 0
    },

    is_online: {
      type: Boolean,
      default: false
    },

    is_available: {
      type: Boolean,
      default: true
    },

    service_categories: {
      type: [String],
      default: []
    },

    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0
    }
  },
  { timestamps: true }
);

// Geo index (VERY IMPORTANT)
providerProfileSchema.index({ location: "2dsphere" });

module.exports = mongoose.model("ProviderProfile", providerProfileSchema ,'provider_profiles');
