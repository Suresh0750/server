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
exports.isCheckUserEmail = void 0;
const user_1 = require("../../../infrastructure/database/mongoose/user");
const otpService_1 = require("../../services/otpService");
const otpStoreData_1 = require("../utils/otpStoreData");
const isCheckUserEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { ischeckEmail } = (0, user_1.getUserRepository)();
        const userId = yield ischeckEmail(email); // * call the querey check whether is email there or not
        if (userId) {
            const { customerOTP } = yield (0, otpService_1.OtpService)(userId, email); // * generate OTP and send to the user
            return yield (0, otpStoreData_1.OtpStoreData)(userId, customerOTP);
        }
        return false;
    }
    catch (error) {
        console.log(`Error from app->->useCases->user->forgetPass \n${error}`);
        throw error;
    }
});
exports.isCheckUserEmail = isCheckUserEmail;
