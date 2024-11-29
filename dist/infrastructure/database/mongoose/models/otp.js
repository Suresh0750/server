"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OtpModel = void 0;
const mongoose_1 = require("mongoose");
// * here use TTL index for delete the document automatically
const OTPModel = new mongoose_1.Schema({
    customerId: String,
    OtpPIN: Number,
    otpExpiration: Date,
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '1m' }
    }
}, { timestamps: true });
// // Create a TTL index on the otpExpiration field
// OTPModel.index({ otpExpiration: 1 }, { expireAfterSeconds: 60 });
const OtpModel = (0, mongoose_1.model)('Otp', OTPModel, "otps");
exports.OtpModel = OtpModel;
