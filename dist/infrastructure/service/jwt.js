"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtService = JwtService;
exports.verifyRefreshToken = verifyRefreshToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function JwtService(customerId, customerName, customerEmail, role) {
    try {
        const payload = { customerId, customerName, customerEmail, role };
        const refreshToken = jsonwebtoken_1.default.sign(payload, String(process.env.REFRESH_TOKEN_SECRET), { expiresIn: '7d' });
        const accessToken = jsonwebtoken_1.default.sign(payload, String(process.env.ACCESS_TOKEN_SECRET), { expiresIn: '15m' });
        return { refreshToken, accessToken };
    }
    catch (err) {
        console.error(`Error generating JWT tokens: ${err}`);
        throw err;
    }
}
function verifyRefreshToken(token) {
    try {
        // console.log(token,'verifyRefreshToken')
        return jsonwebtoken_1.default.verify(token, String(process.env.REFRESH_TOKEN_SECRET));
    }
    catch (error) {
        console.log(`Error from JWTService token verifyRefreshToken \n${error}`);
        throw error;
    }
}
