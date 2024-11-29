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
exports.CustomerLogoutController = exports.GoogleLogin = exports.WorkerGoogleLoginWithRegistrastion = exports.ForgetPassWordController = exports.ResentOTP = exports.CustomerOtpController = exports.getCategoryName = exports.getVerifiedWorkerController = exports.getNearByWorkerDetailsController = exports.userRequestWorkerController = exports.paymentDetails = exports.paymentIdController = exports.paymetnAPIController = exports.ReviewController = exports.getReviewController = void 0;
const otpStoreData_1 = require("../../../app/useCases/utils/otpStoreData");
const jwt_1 = require("../../../infrastructure/service/jwt");
const commonTypes_1 = require("../../../domain/entities/commonTypes");
const customerVerification_1 = require("../../../app/useCases/utils/customerVerification");
const uploadImage_1 = require("../../../app/useCases/utils/uploadImage");
const encrptionUtils_1 = require("../../../shared/utils/encrptionUtils");
const customerUtils_1 = require("../../../app/useCases/utils/customerUtils");
const payU_1 = require("../../../app/services/payU");
// * Review in worker
const getReviewController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('getReviewController');
        const result = yield (0, customerUtils_1.getReviewUsecases)(req.params.id);
        // console.log(result)
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'fetch all review data', result });
    }
    catch (error) {
        console.log(`Error from getReviewController\n${error}`);
        next(error);
    }
});
exports.getReviewController = getReviewController;
const ReviewController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('ReviewController');
        const result = yield (0, customerUtils_1.ReviewUsecases)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'review successfully updated' });
    }
    catch (error) {
        console.log(`Error from Review\n${error}`);
        next(error);
    }
});
exports.ReviewController = ReviewController;
// * paymetAPI
const paymetnAPIController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.body)
        const { hash } = yield (0, payU_1.payment)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, hash });
    }
    catch (error) {
        console.log(`Error from paymetnAPIController\n${error}`);
        next(error);
    }
});
exports.paymetnAPIController = paymetnAPIController;
const paymentIdController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('save payment id');
        const result = yield (0, payU_1.IsActivityUsecases)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true });
    }
    catch (error) {
        console.log(`Error from paymentIdController\n${error}`);
        next(error);
    }
});
exports.paymentIdController = paymentIdController;
const paymentDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('paymeneDetails');
        const result = yield (0, customerUtils_1.paymentUsecases)(req.params.requestId);
        // console.log(result)
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from paymentDetails\n${error}`);
        next(error);
    }
});
exports.paymentDetails = paymentDetails;
// * user Request to worker
const userRequestWorkerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('userRequestWorkerController');
        const result = yield (0, customerUtils_1.userRequestUsecases)(req.body);
        // console.log(result);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Request has been sent' });
    }
    catch (error) {
        console.log(`Error from useRequestWorkerController\n${error}`);
        next(error);
    }
});
exports.userRequestWorkerController = userRequestWorkerController;
// * Get near by worker which around the customer
const getNearByWorkerDetailsController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, customerUtils_1.getNearByWorkerListUtils)(req.params.categoryName);
        // console.log(JSON.stringify(result))
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'successfully fetched near by worker details', result });
    }
    catch (error) {
        console.log(`Error from getNearByWorkerDetailsController\n${error}`);
        next(error);
    }
});
exports.getNearByWorkerDetailsController = getNearByWorkerDetailsController;
// * Customer( User & Worker) controller
const getVerifiedWorkerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, customerUtils_1.getVerifiedWorkerUtils)(req.params.lat, req.params.lon);
        //  console.log(JSON.stringify(result))
        if (result)
            return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Verified worker has been fetched', result });
        return res.status(commonTypes_1.StatusCode.InternalServerError).json({ success: false, message: 'server error trye again' });
    }
    catch (error) {
        console.log(`Error from Customer Resend OTP controller\n ${error}`);
        next(error);
    }
});
exports.getVerifiedWorkerController = getVerifiedWorkerController;
// * getCategory Name for listing while worker signup page 
const getCategoryName = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, customerUtils_1.getCategoryNameUtils)();
        // console.log(JSON.stringify(result))
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: `Fetch category's name has been success`, result });
    }
    catch (error) {
        console.log(`Error from getCategoryName\n${error}`);
        next(error);
    }
});
exports.getCategoryName = getCategoryName;
// * customer comman authendication Part
const CustomerOtpController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { otpValue, customerId } = req.body;
        const isVerifyOTP = yield (0, otpStoreData_1.OtpVerifyUseCases)(otpValue, customerId);
        if (isVerifyOTP) {
            if (req.body.role == 'user') {
                const userData = yield (0, customerVerification_1.userVerification)(req.body.customerId, (req.body.role || commonTypes_1.Role.User)); // * call to verify the customer or update the verify status in database
                const { refreshToken, accessToken } = (0, jwt_1.JwtService)((req.body.customerId).toString(), ((userData === null || userData === void 0 ? void 0 : userData.username) || ''), ((userData === null || userData === void 0 ? void 0 : userData.emailAddress) || ''), (req.body.role || commonTypes_1.Role.User)); // * mongose Id converted as a string
                res.clearCookie(commonTypes_1.CookieTypes.Token);
                // * JWT referesh token setUp
                res.cookie(commonTypes_1.CookieTypes.UserRefreshToken, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                res.cookie(commonTypes_1.CookieTypes.UserAccessToken, accessToken, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    maxAge: 15 * 60 * 1000
                });
                const customerData = {
                    _id: userData === null || userData === void 0 ? void 0 : userData._id,
                    customerName: userData === null || userData === void 0 ? void 0 : userData.username,
                    customerEmail: userData === null || userData === void 0 ? void 0 : userData.emailAddress,
                    role: commonTypes_1.Role.User
                };
                return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'OTP valid and user verified', customerData });
            }
            else {
                const workerData = yield (0, customerVerification_1.workerVerification)(customerId);
                res.clearCookie(commonTypes_1.CookieTypes.Token);
                const { refreshToken, accessToken } = (0, jwt_1.JwtService)((req.body.customerId).toString(), ((workerData === null || workerData === void 0 ? void 0 : workerData.firstName) || ''), ((workerData === null || workerData === void 0 ? void 0 : workerData.emailAddress) || ''), (req.body.role || commonTypes_1.Role.Worker)); // * mongose Id converted as a string
                // * JWT referesh token setUp
                res.cookie(commonTypes_1.CookieTypes.WorkerRefreshToken, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                res.cookie(commonTypes_1.CookieTypes.WorkerAccessToken, accessToken, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    maxAge: 15 * 60 * 1000
                });
                const customerData = {
                    _id: workerData === null || workerData === void 0 ? void 0 : workerData._id,
                    customerName: workerData === null || workerData === void 0 ? void 0 : workerData.firstName,
                    customerEmail: workerData === null || workerData === void 0 ? void 0 : workerData.emailAddress,
                    role: commonTypes_1.Role.Worker
                };
                return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'OTP valid and worker verified', customerData });
            }
        }
        else
            res.status(401).json({ success: false, message: 'Invalid message' });
    }
    catch (err) {
        console.log(`Error from CustomerOtpController\n ${err}`);
        next(err);
    }
});
exports.CustomerOtpController = CustomerOtpController;
const ResentOTP = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resendOtp = yield (0, customerVerification_1.customerResentOTP)(req.body);
        if (resendOtp)
            res.status(200).json({ user: req.body.customerId, success: true, message: 'OTP resent successfully' });
        else
            res.status(500).json({ user: req.body.customerId, success: false, message: 'Failed to resend OTP. Please try again.' });
    }
    catch (error) {
        console.log(`Error from Customer Resend OTP controller\n ${error}`);
        next(error);
    }
});
exports.ResentOTP = ResentOTP;
// * Worker and User ForgetPassword set Controller
const ForgetPassWordController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const setNewPass = yield (0, customerVerification_1.ForgetPassWordUseCase)(req.body);
        if (setNewPass) {
            return res.status(200).json({ success: true, message: "Your password has been successfully updated!" });
        }
        return res.status(500).json({ message: "Server error. Please try again later" });
    }
    catch (error) {
        console.log(`Error from ForgetPassWordController\n${error}`);
        next(error);
    }
});
exports.ForgetPassWordController = ForgetPassWordController;
const WorkerGoogleLoginWithRegistrastion = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const result = yield (0, customerVerification_1.workerGoogleVerification)(req.body.email);
        if (!result)
            return res.status(commonTypes_1.StatusCode.NotFound).json({ success: false, message: `Worker has't register`, modal: true });
        else if (result === null || result === void 0 ? void 0 : result.isBlocked) {
            return res.status(commonTypes_1.StatusCode.Forbidden).json({ success: false, errorMessage: "This worker is blocked and cannot perform this action." });
        }
        else {
            const { refreshToken, accessToken } = (0, jwt_1.JwtService)((((_a = (result._id)) === null || _a === void 0 ? void 0 : _a.toString()) || ''), result.firstName, result.emailAddress, commonTypes_1.Role.Worker);
            // * JWT referesh token setUp
            res.cookie(commonTypes_1.CookieTypes.WorkerRefreshToken, refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                domain: ".profinders.online",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.cookie(commonTypes_1.CookieTypes.WorkerAccessToken, accessToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                domain: ".profinders.online",
                maxAge: 15 * 60 * 1000
            });
        }
        const customerData = {
            _id: result._id,
            customerName: result.firstName,
            customerEmail: result.emailAddress,
            role: commonTypes_1.Role.Worker
        };
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Worker successfully login', customerData });
    }
    catch (error) {
        console.log(`Error from WorkerGoogleLoginWithRegistrastion\n${error}`);
        next(error);
    }
});
exports.WorkerGoogleLoginWithRegistrastion = WorkerGoogleLoginWithRegistrastion;
const GoogleLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log(req.body)
        if (((_a = req === null || req === void 0 ? void 0 : req.body) === null || _a === void 0 ? void 0 : _a.role) == commonTypes_1.Role.User) {
            const userData = yield (0, customerVerification_1.GoogleLoginUseCases)(req.body);
            if (userData === null || userData === void 0 ? void 0 : userData._id) {
                if (userData === null || userData === void 0 ? void 0 : userData.isBlock) {
                    res.status(commonTypes_1.StatusCode.Unauthorized);
                    throw new Error('User is blocked');
                }
                const { refreshToken, accessToken } = (0, jwt_1.JwtService)((userData === null || userData === void 0 ? void 0 : userData._id).toString(), userData.username, userData.EmailAddress, (req.body.role || "worker"));
                // * JWT referesh token setUp
                res.cookie(commonTypes_1.CookieTypes.UserRefreshToken, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                res.cookie(commonTypes_1.CookieTypes.UserAccessToken, accessToken, {
                    // maxAge: 15 * 60 * 1000
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    maxAge: 15 * 60 * 1000
                });
                const customerData = {
                    _id: userData._id,
                    customerName: userData.username,
                    customerEmail: userData.emailAddress,
                    role: commonTypes_1.Role.User
                };
                return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: "successfully login", customerData });
            }
        }
        else if (req.body.role == commonTypes_1.Role.Worker) {
            const file = req.file;
            const imageUrl = yield (0, uploadImage_1.uploadImage)(file);
            req.body.Identity = imageUrl;
            req.body.Password = yield (0, encrptionUtils_1.hashPassword)(req.body.Password);
            const customerDetails = yield (0, customerVerification_1.GoogleLoginWorkerRegister)(req.body);
            if (!customerDetails)
                return res.status(commonTypes_1.StatusCode.NotFound).json({ success: false, message: 'server error' });
            if (customerDetails === null || customerDetails === void 0 ? void 0 : customerDetails._id) {
                const { refreshToken, accessToken } = (0, jwt_1.JwtService)((customerDetails === null || customerDetails === void 0 ? void 0 : customerDetails._id).toString(), customerDetails.firstName, customerDetails.emailAddress, commonTypes_1.Role.Worker);
                // * JWT referesh token setUp
                res.cookie(commonTypes_1.CookieTypes.WorkerRefreshToken, refreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    maxAge: 7 * 24 * 60 * 60 * 1000
                });
                res.cookie(commonTypes_1.CookieTypes.WorkerAccessToken, accessToken, {
                    httpOnly: false,
                    secure: true,
                    sameSite: 'strict',
                    domain: ".profinders.online",
                    maxAge: 15 * 60 * 1000
                });
                const customerData = {
                    _id: customerDetails._id,
                    customerName: customerDetails.firstName,
                    customerEmail: customerDetails.emailAddress,
                    role: commonTypes_1.Role.Worker
                };
                return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: "successfully login", customerData });
            }
        }
        return res.status(commonTypes_1.StatusCode.InternalServerError).json({ success: false, message: 'Server error' });
    }
    catch (error) {
        console.log(`Erron from GoogleLogin`, error);
        next(error);
    }
});
exports.GoogleLogin = GoogleLogin;
const CustomerLogoutController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.clearCookie(commonTypes_1.CookieTypes.WorkerRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
        });
        res.clearCookie(commonTypes_1.CookieTypes.UserRefreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            path: '/'
        });
        res.clearCookie(commonTypes_1.CookieTypes.WorkerAccessToken);
        res.clearCookie(commonTypes_1.CookieTypes.UserAccessToken);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Logged out successfully' });
    }
    catch (error) {
        console.log(`Error from CustomerLogoutController\n${error}`);
        next(error);
    }
});
exports.CustomerLogoutController = CustomerLogoutController;
