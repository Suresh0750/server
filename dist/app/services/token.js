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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOtpAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateOtpAccessToken = (customerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const secret = process.env.token;
        if (!secret) {
            throw new Error("JWT_SECRET is not defined in environment variables.");
        }
        const payload = { customerId };
        const options = { expiresIn: '15m' };
        return jsonwebtoken_1.default.sign(payload, secret, options);
    }
    catch (error) {
        console.error("Error generating OTP token:", error.message);
        throw new Error("Failed to generate OTP token. Please try again.");
    }
});
exports.generateOtpAccessToken = generateOtpAccessToken;
