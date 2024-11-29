"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPRepository = void 0;
const otp_1 = require("./models/otp");
const user_1 = require("./models/user");
const worker_1 = require("./models/worker");
const OTPRepository = () => ({
    createOTP: (customerId, OtpPIN, otpExpiration) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const otpDoc = new otp_1.OtpModel({
                customerId,
                OtpPIN,
                otpExpiration,
            });
            yield otpDoc.save();
            return;
        }
        catch (error) {
            // console.log(
            //   `Error from infrastructure->Otp repository ->createOTP\n`,
            //   error
            // );
            throw error;
        }
    }),
    CustomerVerifyOTP: (otpValue, customerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // * varifyOTP 
            const CustomerOtpData = yield otp_1.OtpModel.findOne({ customerId });
            if ((CustomerOtpData === null || CustomerOtpData === void 0 ? void 0 : CustomerOtpData.OtpPIN) == otpValue)
                return true;
            else
                throw new Error('OTP mismatch. Please try again.');
        }
        catch (error) {
            // Error handling logic missing
            // console.log(`Error from infrastructure->Otp repository ->MongooseOtpRepository \n ${error}`)
            throw error;
        }
    }),
    verifyUser: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_1.UserModel.findByIdAndUpdate({ _id: userId }, { $set: { isVerified: true } });
        }
        catch (err) {
            // console.log(`Error from infrastruture->database->MongooseOtpRepository \n ${err}`)
            throw err;
        }
    }),
    verifyWorker: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield worker_1.WorkerModel.findByIdAndUpdate({ _id: workerId }, { $set: { isVerified: true } });
        }
        catch (err) {
            // console.log(`Error from infrastruture->database->MongooseOtpRepository \n ${err}`)
            throw err;
        }
    }),
    getUserDataResendOTP: (customerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield user_1.UserModel.findById({ _id: customerId });
            return userData === null || userData === void 0 ? void 0 : userData.emailAddress;
        }
        catch (error) {
            // console.log( `Error from infrastruture->database->MongooseOtpRepository  \n ${error}`)
            throw error;
        }
    }),
    getWorkerDataResendOTP: (customerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const workerData = yield worker_1.WorkerModel.findById({ _id: customerId });
            return workerData === null || workerData === void 0 ? void 0 : workerData.emailAddress;
        }
        catch (error) {
            // console.log( `Error from infrastruture->database->MongooseOtpRepository  \n ${error}`)
            throw error;
        }
    }),
    deleteOTP: (customerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield otp_1.OtpModel.deleteOne({ customerId });
        }
        catch (error) {
            // console.log(`Error from infrastruture->database->ResendOTPStore  \n ${error}`)
            throw error;
        }
    })
});
exports.OTPRepository = OTPRepository;
