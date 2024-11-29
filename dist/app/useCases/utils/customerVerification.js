"use strict";
// * Customer authendication 
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
exports.workerGoogleVerification = exports.GoogleLoginUseCases = exports.GoogleLoginWorkerRegister = exports.ForgetPassWordUseCase = exports.customerResentOTP = exports.workerVerification = exports.userVerification = exports.getAllWorkerDataUseCases = void 0;
const otp_1 = require("../../../infrastructure/database/mongoose/otp");
const user_1 = require("../../../infrastructure/database/mongoose/user");
const worker_1 = require("../../../infrastructure/database/mongoose/worker");
const customer_1 = require("../../../infrastructure/database/mongoose/customer");
const otpService_1 = require("../../services/otpService");
const otpStoreData_1 = require("./otpStoreData"); // * store otp data in database and verif OTP
const encrptionUtils_1 = require("../../../shared/utils/encrptionUtils");
const commonTypes_1 = require("../../../domain/entities/commonTypes");
// * get all verified Worker for list in service page Usecases 
const getAllWorkerDataUseCases = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, customer_1.CustomerQueryRepository)().getVerifiedWorker();
    }
    catch (error) {
        console.log(`Error from app->utils->getAllWorkerDataUseCases \n ${error}`);
        throw error;
    }
});
exports.getAllWorkerDataUseCases = getAllWorkerDataUseCases;
// * here verified the worker and user data. check whether they are verified OTP 
const userVerification = (customerId, role) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { verifyUser } = (0, otp_1.OTPRepository)();
        const { getDataFindById } = (0, user_1.getUserRepository)();
        verifyUser(customerId);
        return getDataFindById(customerId);
    }
    catch (error) {
        console.log(`Error from app->utils->customerVerification \n ${error}`);
        throw error;
    }
});
exports.userVerification = userVerification;
const workerVerification = (wokerId) => {
    try {
        const { verifyWorker } = (0, otp_1.OTPRepository)();
        const { getWorkerData } = (0, worker_1.getWorkerRepository)();
        verifyWorker(wokerId);
        return getWorkerData(wokerId);
    }
    catch (error) {
        console.log(`Error from app->utils->workerVerification \n ${error}`);
        throw error;
    }
};
exports.workerVerification = workerVerification;
const customerResentOTP = (customerData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(`Req reached usCases utils cutomerResentOTP`)
        const { getUserDataResendOTP, getWorkerDataResendOTP } = (0, otp_1.OTPRepository)();
        // console.log(customerData.role)
        if (customerData.role == 'user' && customerData.customerId) {
            const userEmail = yield getUserDataResendOTP(customerData.customerId);
            // console.log(userEmail) 
            if (userEmail) {
                const userData = yield (0, otpService_1.OtpService)(customerData.customerId, userEmail);
                // console.log(userData.customerOTP)
                yield (0, otpStoreData_1.ResendOTPStore)(customerData.customerId, Number(userData === null || userData === void 0 ? void 0 : userData.customerOTP)); // * Restore the OTP data in mongodb database
            }
        }
        else if (customerData.customerId) {
            const workerEmail = yield getWorkerDataResendOTP(customerData.customerId);
            console.log(`customerResentotp in worker role`);
            if (workerEmail) {
                const workerData = yield (0, otpService_1.OtpService)(customerData.customerId, workerEmail);
                yield (0, otpStoreData_1.ResendOTPStore)(customerData.customerId, Number(workerData === null || workerData === void 0 ? void 0 : workerData.customerOTP)); // * Restore the OTP data in mongodb database
            }
        }
        return true;
    }
    catch (error) {
        console.log(`Error from app->usecase->utils->customerResentOTP\n${error}`);
        throw error;
    }
});
exports.customerResentOTP = customerResentOTP;
const ForgetPassWordUseCase = (forgetPasswordData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const verifyOTP = yield (0, otpStoreData_1.OtpVerifyUseCases)(Number((_a = forgetPasswordData === null || forgetPasswordData === void 0 ? void 0 : forgetPasswordData.formData) === null || _a === void 0 ? void 0 : _a.otpValue), forgetPasswordData.customerId);
        if (forgetPasswordData.role == "user" && verifyOTP) {
            // console.log(forgetPasswordData)
            const { setNewPassWord } = (0, user_1.getUserRepository)();
            const hashNewPassword = yield (0, encrptionUtils_1.hashPassword)(forgetPasswordData.formData.newPass);
            yield setNewPassWord(forgetPasswordData.customerId, hashNewPassword); // * call the setNewPassWord function for setting new Password user database
            return true;
        }
        else if (forgetPasswordData.role == "worker" && verifyOTP) {
            const { setNewPassWord } = (0, worker_1.getWorkerRepository)();
            const hashNewPassword = yield (0, encrptionUtils_1.hashPassword)(forgetPasswordData.formData.newPass);
            yield setNewPassWord(forgetPasswordData.customerId, hashNewPassword); // * call the setNewPassWord function for setting new Password in worker database
            return true;
        }
        return false;
    }
    catch (error) {
        console.log(`Error from app->usecase->utils->ForgetPassWordUseCase\n${error}`);
        throw error;
    }
});
exports.ForgetPassWordUseCase = ForgetPassWordUseCase;
// * if customer is a worker after verification of email is not there means here we create an account for them
const GoogleLoginWorkerRegister = (customerData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(`Req reached GoogleLoginWorker`)
        delete customerData.role;
        yield (0, worker_1.getWorkerRepository)().insertWorker(customerData);
        return (0, worker_1.getWorkerRepository)().findWorker(customerData.emailAddress);
    }
    catch (error) {
    }
});
exports.GoogleLoginWorkerRegister = GoogleLoginWorkerRegister;
// * Google Login UseCases 
const GoogleLoginUseCases = (customerData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('use case')
        // console.log(customerData)
        if (customerData.role == commonTypes_1.Role.User) {
            const { UserGoogleLogin } = (0, customer_1.CustomerQueryRepository)(); // * user
            // console.log(customerData)
            const UserData = {
                username: customerData.username,
                phoneNumber: 0,
                emailAddress: customerData === null || customerData === void 0 ? void 0 : customerData.emailAddress,
                password: '',
                isVerified: true,
                address: ''
            };
            yield UserGoogleLogin(UserData); // * create the user if already there means it won't create. Used Upsert
            const { findUserByEmail } = (0, user_1.getUserRepository)();
            return findUserByEmail(customerData.emailAddress);
        }
    }
    catch (error) {
        console.log(`Error from app->usecase->utils->GoogleLoginUseCases\n${error}`);
        throw error;
    }
});
exports.GoogleLoginUseCases = GoogleLoginUseCases;
// * worker verification while worker login through google
const workerGoogleVerification = (workerEmail) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, customer_1.CustomerQueryRepository)().WorkerGoogleLoginVerification(workerEmail);
    }
    catch (error) {
        console.log(`Error from app->usecase->utils->workerGoogleVerification\n${error}`);
        throw error;
    }
});
exports.workerGoogleVerification = workerGoogleVerification;
