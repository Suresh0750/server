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
exports.getUserRepository = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
// * Model
const user_1 = require("./models/user");
const conversation_1 = require("./models/conversation");
const message_1 = require("./models/message");
const request_1 = require("./models/request");
const recentActivity_1 = require("./models/recentActivity");
const review_1 = require("./models/review");
const getUserRepository = () => ({
    createUser: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userDoc = new user_1.UserModel(user);
            return yield userDoc.save();
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->createUser\n`,error)
            throw error;
        }
    }),
    findUserByEmail: (emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userData = yield user_1.UserModel.findOne({ emailAddress });
            return userData;
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->findUserByEmail\n`,error)
            throw error;
        }
    }),
    insertUserDetails: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_1.UserModel.updateOne({ emailAddress: user.emailAddress }, { $set: user }, { upsert: true });
            return;
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->insertUserDetails\n`,error)
            throw error;
        }
    }),
    loginVerifyQuery: (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userFetchDetails = yield user_1.UserModel.findOne({ emailAddress: userEmail });
            return userFetchDetails;
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->loginVerify\n`,error)
            throw error;
        }
    }),
    ischeckEmail: (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isCheckEmail = yield user_1.UserModel.findOne({ emailAddress: userEmail });
            return isCheckEmail ? isCheckEmail._id : undefined;
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->ischeckEmail\n`,error)
            throw error;
        }
    }),
    setNewPassWord: (customerId, newPass) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_1.UserModel.findByIdAndUpdate({ _id: customerId }, { $set: { password: newPass } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->setNewPassWord\n`,error)
            throw error;
        }
    }),
    getDataFindById: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield user_1.UserModel.findById({ _id: userId });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->setNewPassWord\n`,error)
            throw error;
        }
    }),
    Profile: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield user_1.UserModel.findById({ _id }, { isVerified: 0, createdAt: 0, updatedAt: 0, __v: 0, isBlocked: 0 });
        }
        catch (error) {
            console.log(`Error from infrastructure->mongoseUser->setNewPassWord\n`, error);
            throw error;
        }
    }),
    updateprofile: (_a) => __awaiter(void 0, [_a], void 0, function* ({ emailAddress, username, profile, phoneNumber }) {
        try {
            if (profile) {
                yield user_1.UserModel.updateOne({ emailAddress }, { username, phoneNumber, profile });
            }
            else {
                yield user_1.UserModel.updateOne({ emailAddress }, { username, phoneNumber });
            }
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->updateprofile\n`,error)
            throw error;
        }
    }),
    conversationQuery: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield new conversation_1.ConversationModel(data).save();
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->conversationQuery\n`,error)
            throw error;
        }
    }),
    fetchConversation: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const res = yield conversation_1.ConversationModel.find({ userId }, { __v: 0 })
                .populate('workerId', 'firstName profile phoneNumber')
                .lean(); // * Convert Mongoose documents to plain JavaScript objects
            return res;
            // db.conversationcollections.find({participants:{$in:['66ea91c78f03af0b8231af43']}})
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->fetcheConversation\n`,error)
            throw error;
        }
    }),
    checkConversation: (userId, workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield conversation_1.ConversationModel.findOne({ userId: new ObjectId(userId), workerId: new ObjectId(workerId) }); // * for find the document kept ObjectId
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->checkConversation\n`,error)
            throw error;
        }
    }),
    updateConversation: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield conversation_1.ConversationModel.updateOne({ userId: new ObjectId(data.userId) }, { $set: { lastMessage: data === null || data === void 0 ? void 0 : data.lastMessage, userUnread: 0 }, $inc: { workerUnread: 1 } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->updateConversation\n`,error)
            throw error;
        }
    }),
    findconversationId: (userId, workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield conversation_1.ConversationModel.findOne({ userId: new ObjectId(userId), workerId: new ObjectId(workerId) }, { _id: 1 });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->findconversationId\n`,error)
            throw error;
        }
    }),
    createMessage: (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const createdMessage = yield new message_1.MessageModel(data).save();
            const messageObject = createdMessage.toObject();
            return Object.assign(Object.assign({}, messageObject), { conversationId: ((_a = messageObject.conversationId) === null || _a === void 0 ? void 0 : _a.toString()) || "" });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->createMessage\n`,error)
            throw error;
        }
    }),
    updateIsReadQuery: (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield message_1.MessageModel.updateMany({ conversationId: new ObjectId(conversationId), isRead: false }, { $set: { isRead: true } }); // * while worker fetch the data
            yield conversation_1.ConversationModel.findByIdAndUpdate({ _id: new ObjectId(conversationId) }, { $set: { userUnread: 0 } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->updateIsReadQuery->\n`,error)
            throw error;
        }
    }),
    fetchMessageQuery: (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // await ConversationModel.updateOne({conversationId:new ObjectId(conversationId)},{$set:{userUnread:0}})
            return yield message_1.MessageModel.find({ conversationId: new ObjectId(conversationId) }).lean();
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->fetchMessageQuery\n`,error)
            throw error;
        }
    }),
    getBooking: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.find({ userId: new ObjectId(userId) });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->fetchMessageQuery\n`,error)
            throw error;
        }
    }),
    getPaymentId: (requestId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield recentActivity_1.RecentActivityModel.findOne({ requestId: new ObjectId(requestId) }, { paymentId: 1, _id: 0 });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->getPaymentId\n`,error)
            throw error;
        }
    }),
    getReviewID: (userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield review_1.ReviewModel.distinct("requestId", { userId: new ObjectId(userId) });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->getPaymentId\n`,error)
            throw error;
        }
    })
});
exports.getUserRepository = getUserRepository;
