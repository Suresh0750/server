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
exports.sendEmail = void 0;
const nodemailer_1 = require("nodemailer");
const sendEmail = (emailId, otp) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`sendEmail controller`, emailId, otp);
        const transporter = (0, nodemailer_1.createTransport)({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: "suresh007inr@gmail.com",
            to: emailId,
            subject: "OTP Verification",
            html: `
                <div style="font-family: Arial, sans-serif; padding: 20px;">
                    <h2 style="font-size: 24px; color: #333;">Your OTP Verification</h2>
                    <p style="font-size: 16px; color: #555;">Please use the following OTP to verify your account:</p>
                    <h2 style="font-size: 28px; color: #4CAF50;">${otp}</h2>
                    <p style="font-size: 14px; color: #777;">This OTP is valid for 1 minutes. Please do not share it with anyone.</p>
                </div>
                `
        };
        yield transporter.sendMail(mailOptions);
    }
    catch (error) {
        //    console.log(`sendEmail nodemail err\n`,error);
        throw error;
    }
});
exports.sendEmail = sendEmail;
