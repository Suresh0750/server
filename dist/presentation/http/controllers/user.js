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
exports.isCheckEmail = exports.LoginUser = exports.userSignupController = exports.profile = exports.editprofile = exports.conversation = exports.getConversation = exports.getMessage = exports.getBooking = exports.paymentId = void 0;
const jwt_1 = require("../../../infrastructure/service/jwt");
const loginVerifyUser_1 = require("../../../app/useCases/user/loginVerifyUser");
const forgetPass_1 = require("../../../app/useCases/user/forgetPass");
const commonTypes_1 = require("../../../domain/entities/commonTypes");
const uploadImage_1 = require("../../../app/useCases/utils/uploadImage");
const commonTypes_2 = require("../../../domain/entities/commonTypes");
const user_1 = require("../../../app/useCases/user/user");
const token_1 = require("../../../app/services/token");
const paymentId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_1.paymentIdUsecases)(req.params.requestId);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'successfully fetched data', result });
    }
    catch (error) {
        console.log(`Error from Presntation->controllers->paymentId \n${error}`);
        next(error);
    }
});
exports.paymentId = paymentId;
// * get booking data
const getBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookingDetails, reviewDetails } = yield (0, user_1.getBookingUsecases)(req.params.id);
        // console.log(JSON.stringify(bookingDetails))
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched', result: bookingDetails, reviewDetails });
    }
    catch (error) {
        console.log(`Error from Presntation->controllers->getBooking \n${error}`);
        next(error);
    }
});
exports.getBooking = getBooking;
// * user conversation
const getMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_1.getMessageUsecases)(req.params.id);
        // console.log(JSON.stringify(result))
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'successfully msg fetched', result });
    }
    catch (error) {
        console.log(`Error from Presntation->controllers->getMessage \n${error}`);
        next(error);
    }
});
exports.getMessage = getMessage;
const getConversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_1.getConversationUsecases)(req.params.id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Data successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from Presntation->controllers->getConversation \n${error}`);
        next(error);
    }
});
exports.getConversation = getConversation;
const conversation = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, user_1.conversationUsecases)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'successfully updated' });
    }
    catch (error) {
        console.log(`Error from Presntation->controllers->conversation \n${error}`);
        next(error);
    }
});
exports.conversation = conversation;
// * profile
const editprofile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        if (JSON.parse(req.body.isImage)) {
            const image = yield (0, uploadImage_1.uploadImage)(file);
            // console.log(image)
            req.body.profile = image;
            // console.log(req.body.profile)
        }
        yield (0, user_1.EditprofileUsecases)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data successfully updated' });
    }
    catch (error) {
        console.log(`Error from Presntation->controllers->editprofile \n${error}`);
        next(error);
    }
});
exports.editprofile = editprofile;
const profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('profile');
        const result = yield (0, user_1.ProfileUsecases)(req.params.id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched', result });
    }
    catch (error) {
        console.log(`Error from Presntation->controllers->profile \n${error}`);
        next(error);
    }
});
exports.profile = profile;
const userSignupController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('reached userSignup constroller');
        // console.log(req.body)
        const user = yield (0, user_1.createUser)(req.body);
        const token = yield (0, token_1.generateOtpAccessToken)(user);
        res.cookie(commonTypes_2.CookieTypes.Token, token, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            domain: ".profinders.online",
        });
        res.status(commonTypes_1.StatusCode.Success).json({ user, success: true });
    }
    catch (err) {
        console.log(err);
        next(err);
    }
});
exports.userSignupController = userSignupController;
const LoginUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        console.log('request reached controller');
        // (req.body)
        const loginUsecase = yield (0, loginVerifyUser_1.LoginVerify)((_a = req.body) === null || _a === void 0 ? void 0 : _a.emailAddress, (_b = req.body) === null || _b === void 0 ? void 0 : _b.password);
        if (!loginUsecase) {
            res.status(commonTypes_1.StatusCode.Unauthorized);
            throw new Error('check email and password');
        }
        else if (loginUsecase && (loginUsecase === null || loginUsecase === void 0 ? void 0 : loginUsecase.isBlock)) {
            res.status(commonTypes_1.StatusCode.Unauthorized);
            throw new Error('User is blocked');
        }
        else if (loginUsecase && (loginUsecase === null || loginUsecase === void 0 ? void 0 : loginUsecase._id)) {
            const { refreshToken, accessToken } = (0, jwt_1.JwtService)((loginUsecase._id).toString(), loginUsecase.username, loginUsecase.emailAddress, (req.body.role || commonTypes_1.Role.User)); // * mongose Id converted as a string
            // * JWT referesh token setUp
            res.cookie(commonTypes_2.CookieTypes.UserRefreshToken, refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                domain: ".profinders.online",
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            res.cookie(commonTypes_2.CookieTypes.UserAccessToken, accessToken, {
                httpOnly: false,
                secure: true,
                sameSite: 'strict',
                domain: ".profinders.online",
                maxAge: 15 * 60 * 1000
            });
            const customerData = {
                _id: loginUsecase._id,
                customerName: loginUsecase.username,
                customerEmail: loginUsecase.emailAddress,
                role: commonTypes_1.Role.User
            };
            // console.log(customerData)
            return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Login successful', customerData });
        }
    }
    catch (error) {
        console.log(`Error from Presntation->controllers ${error}`);
        next(error);
    }
});
exports.LoginUser = LoginUser;
// * check email is there or not for forget password page
const isCheckEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const userEmailValidation = yield (0, forgetPass_1.isCheckUserEmail)((_a = req.body) === null || _a === void 0 ? void 0 : _a.emailAddress);
        if (userEmailValidation) {
            return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'verified success', userEmailValidation });
        }
        else {
            return res.status(commonTypes_1.StatusCode.NotFound).json({
                success: false,
                message: 'This email is not registered. Please check your email address.',
            });
        }
    }
    catch (error) {
        console.log(`Error from Presntation->controllers->isCheckEmail \n${error}`);
        next(error);
    }
});
exports.isCheckEmail = isCheckEmail;
