"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYU_SALT = exports.PAYU_MERCHANT_KEY = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
exports.PAYU_SALT = process.env.PAYU_SALT;
// DEV:
// export const RABBITMQ_URL  = "amqp://rabbitmq:5672"
