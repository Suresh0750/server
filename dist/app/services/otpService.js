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
exports.OtpService = void 0;
const nodemailer_1 = require("../../infrastructure/service/email/nodemailer");
function generateOtp() {
    return Math.floor(1000 + Math.random() * 1000);
}
const OtpService = (customerId, emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(`Otp service`);
        const customerOTP = generateOtp(); // * call to generate the OTP
        yield (0, nodemailer_1.sendEmail)(emailAddress, customerOTP); // * call nodemailer for sent otp to user
        return { customerOTP, customerId };
    }
    catch (error) {
        throw error;
    }
});
exports.OtpService = OtpService;
