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
exports.createUser = exports.ProfileUsecases = exports.EditprofileUsecases = exports.conversationUsecases = exports.getConversationUsecases = exports.getMessageUsecases = exports.getBookingUsecases = exports.paymentIdUsecases = void 0;
const user_1 = require("../../../infrastructure/database/mongoose/user");
const encrptionUtils_1 = require("../../../shared/utils/encrptionUtils");
const otpService_1 = require("../../services/otpService");
const otpStoreData_1 = require("../utils/otpStoreData");
const chatUtils_1 = require("../utils/chatUtils");
//672b0a442d110d2355978ef4
const paymentIdUsecases = (requestId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, user_1.getUserRepository)().getPaymentId(requestId);
    }
    catch (error) {
        console.log(`error from usecase in paymentIdUsecases`, error);
        throw error;
    }
});
exports.paymentIdUsecases = paymentIdUsecases;
// * get booking details usecases
const getBookingUsecases = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [bookingDetails, reviewDetails] = yield Promise.all([
            (0, user_1.getUserRepository)().getBooking(userId),
            (0, user_1.getUserRepository)().getReviewID(userId)
        ]);
        return { bookingDetails, reviewDetails };
    }
    catch (error) {
        console.log(`error from usecase in getBookingUsecases`, error);
        throw error;
    }
});
exports.getBookingUsecases = getBookingUsecases;
// * user in chat side
const getMessageUsecases = (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, user_1.getUserRepository)().updateIsReadQuery(conversationId);
        return yield (0, user_1.getUserRepository)().fetchMessageQuery(conversationId);
    }
    catch (error) {
        console.log(`error from usecase in getMessageUsecases`, error);
        throw error;
    }
});
exports.getMessageUsecases = getMessageUsecases;
const getConversationUsecases = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, user_1.getUserRepository)().fetchConversation(id);
    }
    catch (error) {
        console.log(`error from usecase in getConversationUsecases`, error);
        throw error;
    }
});
exports.getConversationUsecases = getConversationUsecases;
const conversationUsecases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const checkExist = yield (0, user_1.getUserRepository)().checkConversation(String(data === null || data === void 0 ? void 0 : data.userId), String(data === null || data === void 0 ? void 0 : data.workerId));
        // console.log('Checkexist')
        // console.log(JSON.stringify(checkExist)) 
        if (checkExist) {
            yield (0, user_1.getUserRepository)().updateConversation(data);
        }
        else {
            // * user click messge box in single worker details page side here no message
            yield (0, user_1.getUserRepository)().conversationQuery(data); // * create conversation
        }
        const conversation = yield (0, user_1.getUserRepository)().findconversationId(String(data === null || data === void 0 ? void 0 : data.userId), String(data === null || data === void 0 ? void 0 : data.workerId));
        if ((data === null || data === void 0 ? void 0 : data.lastMessage) && (conversation === null || conversation === void 0 ? void 0 : conversation._id)) {
            const result = yield (0, user_1.getUserRepository)().createMessage({ conversationId: (conversation === null || conversation === void 0 ? void 0 : conversation._id) || '', sender: data === null || data === void 0 ? void 0 : data.userId, message: data === null || data === void 0 ? void 0 : data.lastMessage });
            console.log(`create the new document`);
            yield (0, chatUtils_1.sendMessage)(result);
        }
        return;
    }
    catch (error) {
        console.log(`error from usecase in conversationUsecases`, error);
        throw error;
    }
});
exports.conversationUsecases = conversationUsecases;
// * profile side
const EditprofileUsecases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, emailAddress, phoneNumber, profile } = data;
        const userData = {
            username,
            phoneNumber,
            emailAddress
        };
        if (profile) {
            userData.profile = profile;
        }
        console.log('userData');
        console.log(userData);
        return (0, user_1.getUserRepository)().updateprofile(userData);
    }
    catch (error) {
        console.log(`error from usecase in editprofileUsecases`, error);
        throw error;
    }
});
exports.EditprofileUsecases = EditprofileUsecases;
const ProfileUsecases = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, user_1.getUserRepository)().Profile(_id);
    }
    catch (error) {
        console.log(`error from usecase in ProfileUsecases`, error);
        throw error;
    }
});
exports.ProfileUsecases = ProfileUsecases;
const createUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(`req comes usecase createUser`);
        const { findUserByEmail, insertUserDetails, createUser } = (0, user_1.getUserRepository)();
        const isExistUser = yield findUserByEmail(userData.emailAddress);
        if (isExistUser && (isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.isVerified)) {
            throw new Error("Email is already exist");
        }
        const hashPass = yield (0, encrptionUtils_1.hashPassword)(userData.password); // * here we used to hash the password
        userData.password = hashPass;
        let _id;
        if (isExistUser && !(isExistUser === null || isExistUser === void 0 ? void 0 : isExistUser.isVerified)) {
            yield insertUserDetails(userData);
            userData = isExistUser;
            _id = isExistUser._id;
        }
        else {
            userData = yield createUser(userData); // * we store the data to the database
            _id = userData._id;
        }
        const { customerOTP, customerId } = yield (0, otpService_1.OtpService)(_id, userData.emailAddress); // * call the otpService
        console.log(`${customerOTP} -- ${customerId}==>`);
        yield (0, otpStoreData_1.OtpStoreData)(customerId, customerOTP);
        return customerId;
    }
    catch (err) {
        console.log(`error from usecase in createUser`, err === null || err === void 0 ? void 0 : err.message);
        throw err;
    }
});
exports.createUser = createUser;
