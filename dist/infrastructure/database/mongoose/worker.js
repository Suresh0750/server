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
exports.getWorkerRepository = void 0;
const mongoose_1 = require("mongoose");
// * model
const worker_1 = require("./models/worker");
const request_1 = require("./models/request");
const recentActivity_1 = require("./models/recentActivity");
const conversation_1 = require("./models/conversation");
const message_1 = require("./models/message");
const review_1 = require("./models/review");
const payment_1 = require("./models/payment");
const { ObjectId } = mongoose_1.Types;
const getWorkerRepository = () => ({
    createWorker: (workerData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const workerDetails = new worker_1.WorkerModel(workerData);
            yield workerDetails.save();
            return yield worker_1.WorkerModel.findOne({ emailAddress: workerData.emailAddress });
        }
        catch (error) {
            // console.log(`Erro from infrastructure->database->MongooseWorkerRepository\n`,error)
            throw error;
        }
    }),
    insertWorker: (customerData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { firstName, lastName, phoneNumber, emailAddress, password, profile, category, country, streetAddress, state, city, apt, identity, postalCode } = customerData;
            const workerDetails = yield worker_1.WorkerModel.updateOne({ emailAddress: customerData.emailAddress }, { $set: { firstName, lastName, phoneNumber, emailAddress, password, profile, category, country, streetAddress, state, city, apt, identity, postalCode, isVerified: true } }, { upsert: true });
            return customerData;
        }
        catch (error) {
            // console.log(`Erro from infrastructure->database->insertWorker\n`,error)
            throw error;
        }
    }),
    findWorker: (workerEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.findOne({ emailAddress: workerEmail });
        }
        catch (error) {
            // console.log(`Error infrastructure->database->MongooseWorkerRepository\n${error}`)
            throw error;
        }
    }),
    ischeckEmail: (emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const isCheckEmail = yield worker_1.WorkerModel.findOne({ emailAddress });
            console.log(isCheckEmail);
            return isCheckEmail ? isCheckEmail._id : undefined;
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->ischeckEmail\n`,error)
            throw error;
        }
    }),
    setNewPassWord: (customerId, newPass) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield worker_1.WorkerModel.findByIdAndUpdate({ _id: customerId }, { $set: { password: newPass } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->setNewPassWord\n`,error)
            throw error;
        }
    }),
    loginVerifyQuery: (workerEmail) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(`req reached workerLoginVerify`);
            const workerFetchDetails = yield worker_1.WorkerModel.findOne({ emailAddress: workerEmail });
            return workerFetchDetails;
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->loginVerify\n`,error)
            throw error;
        }
    }),
    getWorkerData: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.findById({ _id: workerId });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->loginVerify\n`,error)
            throw error;
        }
    }),
    chagneExitWorkerCategoryName: (existName, newName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield worker_1.WorkerModel.updateMany({ category: existName }, { $set: { category: newName } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->chagneExitWorkerCategoryName->\n`,error)
            throw error;
        }
    }),
    // * Add worker project details  && worker Project page
    addWorkerProjectDetails: (_id, ProjectDetails) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield worker_1.WorkerModel.updateOne({ _id }, { $push: { workerImage: ProjectDetails } }); // * worker add project image
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->addWorkerProjectDetails->\n`,error)
            throw error;
        }
    }),
    getProjectDetailsQuery: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.findById({ _id }, { workerImage: 1, _id: 0 });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getProjectDetailsQuery->\n`,error)
            throw error;
        }
    }),
    getSingleWorkerDetailsQuery: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.findById({ _id });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getSingleWorkerDetailsQuery->\n`,error)
            throw error;
        }
    }),
    // * Request of worker side
    getAllRequestQuery: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.find({ workerId, isAccept: "Pending" });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getAllRequestQuery->\n`,error)
            throw error;
        }
    }),
    isAcceptWorkQuery: (_id, isPayment) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield request_1.RequestModel.findByIdAndUpdate({ _id }, { $set: { isAccept: "Accepted", payment: isPayment } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->isAcceptWorkQuery->\n`,error)
            throw error;
        }
    }),
    isRejectWorkQuery: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield request_1.RequestModel.findByIdAndUpdate({ _id }, { $set: { isAccept: "Cancelled" } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->isRejectWorkQuery->\n`,error)
            throw error;
        }
    }),
    IsActivityQuery: (requestId, paymentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield recentActivity_1.RecentActivityModel.updateOne({ requestId: new ObjectId(requestId) }, { $set: { paymentId } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->IsActivityQuery->\n`,error)
            throw error;
        }
    }),
    paymentData: (requestId, payment, paymentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield payment_1.PaymentModel.create({ requestId, payment, paymentId });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->paymentData->\n`,error)
            throw error;
        }
    }),
    getChatsNameQuery: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield conversation_1.ConversationModel.find({ workerId }, { __v: 0 }).populate('userId', 'username profile').lean();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getChatesNameQuery->\n`,error)
            throw error;
        }
    }),
    messageQuery: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield new message_1.MessageModel(data).save();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->messageQuery->\n`,error)
            throw error;
        }
    }),
    updatemessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ _id, lastMessage }) {
        try {
            console.log(`update query`);
            // console.log(_id,lastMessage)
            yield conversation_1.ConversationModel.findByIdAndUpdate({ _id }, { $set: { lastMessage, workerUnread: 0 }, $inc: { userUnread: 1 } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->updatemessage->\n`,error)
            throw error;
        }
    }),
    fetchMessage: (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield message_1.MessageModel.find({ conversationId: new ObjectId(conversationId) }).lean();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->fetchMessage->\n`,error)
            throw error;
        }
    }),
    getSingleMsg: (message) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield message_1.MessageModel.findOne({ message });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getSingleMsg->\n`,error)
            throw error;
        }
    }),
    updateIsReadQuery: (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield message_1.MessageModel.updateMany({ conversationId: new ObjectId(conversationId), isRead: false }, { $set: { isRead: true } }); // * while worker fetch the data
            yield conversation_1.ConversationModel.findByIdAndUpdate({ _id: new ObjectId(conversationId) }, { $set: { workerUnread: 0 } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->updateIsReadQuery->\n`,error)
            throw error;
        }
    }),
    isResendActivityQuery: (requestId, payment, workerId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield recentActivity_1.RecentActivityModel.create({ requestId, payment, workerId, userId });
        }
        catch (error) {
            throw error;
        }
    }),
    countResentWorkQuery: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield recentActivity_1.RecentActivityModel.aggregate([
                { $match: { workerId: new ObjectId(workerId) } },
                {
                    $group: {
                        _id: null, // * Grouping all documents together
                        countIsCompleteFalse: {
                            $sum: { $cond: [{ $eq: ["$isCompleted", false] }, 1, 0] }
                        },
                        countIsCompleteTrue: {
                            $sum: { $cond: [{ $eq: ["$isCompleted", true] }, 1, 0] }
                        },
                        totalPayment: {
                            $sum: {
                                $cond: [
                                    {
                                        $and: [
                                            { $eq: ["$isCompleted", true] },
                                            { $ne: ["$paymentId", null] } // Check if paymentId is not null
                                        ]
                                    },
                                    "$payment",
                                    0
                                ]
                            }
                        },
                        pendingPayment: {
                            $sum: {
                                $cond: [
                                    { $and: [{ $eq: ["$isCompleted", true] }, { $eq: ["$paymentId", null] }] },
                                    "$payment",
                                    0
                                ]
                            }
                        },
                        pendingCustomer: {
                            $sum: {
                                $cond: [
                                    {
                                        $and: [
                                            { $eq: ["$isCompleted", true] }, // * Check if isCompleted is true
                                            { $eq: ["$paymentId", null] } // * Check if paymentId is null
                                        ]
                                    },
                                    1, // * Add 1 if the document matches the condition, it's increasing count one by  one.
                                    0 // Otherwise, add 0
                                ]
                            }
                        }
                    }
                }
            ]);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->isResendActivityQuery->\n`,error)
            throw error;
        }
    }),
    totalOffer: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.countDocuments({ workerId: new ObjectId(workerId) }).countDocuments();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->totalOffer->\n`,error)
            throw error;
        }
    }),
    getRecentActivity: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield recentActivity_1.RecentActivityModel.find({ workerId: new ObjectId(workerId) }).populate("requestId", "user workerId").populate("workerId", "category");
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getRecentActivity->\n`,error)
            throw error;
        }
    }),
    ratingQuery: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield review_1.ReviewModel.aggregate([
                { $match: { workerId: new ObjectId(workerId) } },
                {
                    $group: {
                        _id: null,
                        sum: { $sum: "$rating" },
                        count: { $count: {} } // * it is count of total document for calculate the review
                    }
                }
            ]);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->ratingQuery->\n`,error)
            throw error;
        }
    }),
    getUpcomingWorks: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield recentActivity_1.RecentActivityModel.find({ workerId }).populate('requestId', '_id preferredDate preferredTime serviceLocation additionalNotes payment paymentId').populate('userId', '_id username emailAddress address phoneNumber');
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->ratingQuery->\n`,error)
            throw error;
        }
    }),
    workCompleteQuery: (_id, isCompleted, status) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield recentActivity_1.RecentActivityModel.findByIdAndUpdate({ _id: new ObjectId(_id) }, { $set: { isCompleted: isCompleted, status } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->workComplete->\n`,error)
            throw error;
        }
    }),
    markCompleteQuery: (_id, status) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield request_1.RequestModel.findByIdAndUpdate({ _id: new ObjectId(_id) }, { $set: { isAccept: status } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->workComplete->\n`,error)
            throw error;
        }
    }),
    availabilityInfo: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield worker_1.WorkerModel.findByIdAndUpdate({ _id: new ObjectId(data === null || data === void 0 ? void 0 : data._id) }, { experience: data === null || data === void 0 ? void 0 : data.experience, availability: data === null || data === void 0 ? void 0 : data.availability, rate: data === null || data === void 0 ? void 0 : data.rate });
        }
        catch (error) {
            throw error;
        }
    })
});
exports.getWorkerRepository = getWorkerRepository;
