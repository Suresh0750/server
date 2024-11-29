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
exports.CustomerQueryRepository = void 0;
// * database model
const category_1 = require("./models/category");
const user_1 = require("./models/user");
const worker_1 = require("./models/worker");
const request_1 = require("./models/request");
const review_1 = require("./models/review");
// * Mongoose types
const mongoose_1 = require("mongoose");
const recentActivity_1 = require("./models/recentActivity");
const { ObjectId } = mongoose_1.Types;
const CustomerQueryRepository = () => ({
    UserGoogleLogin: (user) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(user);
            const userDoc = yield user_1.UserModel.updateOne({ emailAddress: user.emailAddress }, { $set: { user } }, { upsert: true });
            return userDoc;
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->createUser\n`,error)
            throw error;
        }
    }),
    UserWorkerLogin: (workerData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.updateOne({ emailAddress: workerData.emailAddress }, { $set: { workerData } }, { upsert: true });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->UserWorkerLogin\n`,error)
            throw error;
        }
    }),
    WorkerGoogleLoginVerification: (emailAddress) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.findOne({ emailAddress });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->UserWorkerLogin\n`,error)
            throw error;
        }
    }),
    getVerifiedWorker: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.find({ isWorker: true }); // * replace the query which only fetch verified worker for show the servie page
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->getVerifiedWorker\n`,error)
            throw error;
        }
    }),
    getCategoryName: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield category_1.CategoryModel.distinct('categoryName', { isListed: true }); // * show all category in worker signup page for select
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->getCategoryName\n`,error)
            throw error;
        }
    }),
    getNearByWorkerListQuery: (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.find({ category: categoryName });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->getNearByWorkerListQuery\n`,error)
            throw error;
        }
    }),
    // * userRequest to worker
    userRequestQuery: (userRequestDetails) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield request_1.RequestModel.create(userRequestDetails);
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->userRequestQuery\n`,error)
            throw error;
        }
    }),
    checkExitstRequestQuery: (userId, workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.findOne({ userId, workerId, isAccept: "Pending" });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->checkExitstRequestQuery\n`,error)
            throw error;
        }
    }),
    createReview: (data) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield review_1.ReviewModel.create(data);
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->createReview\n`,error)
            throw error;
        }
    }),
    getReview: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return review_1.ReviewModel.find({ workerId: new ObjectId(workerId) }).populate('userId', 'username profile _id');
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->getReview\n`,error)
            throw error;
        }
    }),
    checkUserPayed: (workerId, userId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield recentActivity_1.RecentActivityModel.findOne({ workerId: new ObjectId(workerId), userId: new ObjectId(userId) }, { paymentId: 1, _id: 0 });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->checkUserPayed\n`,error)
            throw error;
        }
    }),
    paymentDetails: (requestId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.findOne({ _id: new ObjectId(requestId) });
        }
        catch (error) {
            // console.log(`Error from infrastructure->mongoseUser->paymentDetails\n`,error)
            throw error;
        }
    })
});
exports.CustomerQueryRepository = CustomerQueryRepository;
