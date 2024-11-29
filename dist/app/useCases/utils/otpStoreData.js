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
exports.OtpVerifyUseCases = exports.OtpStoreData = exports.ResendOTPStore = void 0;
const otp_1 = require("../../../infrastructure/database/mongoose/otp"); // * OTP mongooseRepository there we write mongoose query
const ResendOTPStore = (customerId, OtpPIN) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("req entered OtpStoreData controler");
        // console.log('resend otp')
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000);
        const OtpRepo = (0, otp_1.OTPRepository)();
        yield OtpRepo.deleteOTP(customerId); // * for deleting the old OTP data
        yield OtpRepo.createOTP(customerId, OtpPIN, expirationTime); // * store the new OTP data
        return true;
    }
    catch (error) {
        console.log(`Error from OtpStoreData controller\n`, error);
        throw error;
    }
});
exports.ResendOTPStore = ResendOTPStore;
const OtpStoreData = (customerId, OtpPIN) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log("req entered OtpStoreData controler");
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000);
        const OtpRepo = (0, otp_1.OTPRepository)();
        yield OtpRepo.createOTP(customerId, OtpPIN, expirationTime);
        return customerId;
    }
    catch (error) {
        console.log(`Error from OtpStoreData controller\n`, error);
        throw error;
    }
});
exports.OtpStoreData = OtpStoreData;
const OtpVerifyUseCases = (Otp, customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(Otp,customerId)
        const { CustomerVerifyOTP } = (0, otp_1.OTPRepository)(); // * Here we called the method for calling the mogoose query
        return yield CustomerVerifyOTP(Otp, customerId);
    }
    catch (error) {
        console.log(`Error from usecase->utils->Otpverify \n ${error}`);
        throw error;
    }
});
exports.OtpVerifyUseCases = OtpVerifyUseCases;
