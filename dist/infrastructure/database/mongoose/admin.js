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
exports.AdminMongoose = void 0;
const mongoose_1 = require("mongoose");
const { ObjectId } = mongoose_1.Types;
// * Model
const category_1 = require("./models/category");
const worker_1 = require("./models/worker");
const user_1 = require("./models/user");
const recentActivity_1 = require("./models/recentActivity");
const review_1 = require("./models/review");
const payment_1 = require("./models/payment");
const request_1 = require("./models/request");
const AdminMongoose = () => ({
    // * Admin in category side query's
    CheckExistCategory: (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const checkProduct = yield category_1.CategoryModel.findOne({ categoryName });
            return checkProduct;
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->AddCategoryQuery->\n`,error)
            throw error;
        }
    }),
    AddCategoryQuery: (categoryDetails) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const categoryDetail = new category_1.CategoryModel(categoryDetails);
            return yield categoryDetail.save();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->AddCategoryQuery->\n`,error)
            throw error;
        }
    }),
    getAllCategoryQuery: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield category_1.CategoryModel.find({});
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getAllCategoryQuery->\n`,error)
            throw error;
        }
    }),
    IsListedQuery: (_id, isListed) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log('query')
            // console.log(_id,isListed)
            yield category_1.CategoryModel.findByIdAndUpdate({ _id: new ObjectId(_id) }, { $set: { isListed: isListed } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getAllCategoryQuery->\n`,error)
            throw error;
        }
    }),
    deleteProductQuery: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield category_1.CategoryModel.findByIdAndDelete({ _id: new ObjectId(_id) });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->deleteProductQuery->\n`,error)
            throw error;
        }
    }),
    EditeCategoryQuery: (categoryData) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield category_1.CategoryModel.findByIdAndUpdate({ _id: categoryData._id }, { $set: { categoryName: categoryData.categoryName, categoryDescription: categoryData.categoryDescription, categoryImage: categoryData.categoryImage } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->EditeCategoryQuery->\n`,error)
            throw error;
        }
    }),
    getEditCategoryName: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield category_1.CategoryModel.findById({ _id }, { categoryName: 1, _id: 0 });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getEditCategoryName->\n`,error)
            throw error;
        }
    }),
    // * Admin in Worker Approval side
    getUnApprovalWorker: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.find({ isWorker: false }); //* all un Approval workers
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getInvalidWorker->\n`,error)
            throw error;
        }
    }),
    isWorkerApproval: (_id) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield worker_1.WorkerModel.findByIdAndUpdate({ _id }, { $set: { isWorker: true } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->isWorkerApproval->\n`,error)
            throw error;
        }
    }),
    // * Admin in Worker side query's
    getAllWorkerList: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.find({});
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->EditeCategoryQuery->\n`,error)
            throw error;
        }
    }),
    // * Admin in User Side Query's
    getAllUserList: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield user_1.UserModel.find({});
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getAllUserList->\n`,error)
            throw error;
        }
    }),
    isBlockUser: (userId, isBlocked) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield user_1.UserModel.findByIdAndUpdate({ _id: userId }, { $set: { isBlocked } });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->isBlockUser->\n`,error)
            throw error;
        }
    }),
    totalRevenue: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield recentActivity_1.RecentActivityModel.aggregate([
                {
                    $group: { _id: null, payment: { $sum: { $cond: [{ $ne: ["$paymentId", null] }, "$payment", 0] } } }
                }
            ]);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->totalRevenue->\n`,error)
            throw error;
        }
    }),
    totalReview: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield review_1.ReviewModel.countDocuments();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->totalReview->\n`,error)
            throw error;
        }
    }),
    totalWorkers: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.countDocuments();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->totalReview->\n`,error)
            throw error;
        }
    }),
    avgRating: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield review_1.ReviewModel.aggregate([
                {
                    $group: { _id: null, sum: { $sum: "$rating" }, count: { $sum: 1 } },
                }
            ]);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->avgRating->\n`,error)
            throw error;
        }
    }),
    paymentData: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield payment_1.PaymentModel.find();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->paymentData->\n`,error)
            throw error;
        }
    }),
    workerDistribution: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.aggregate([
                { $group: { _id: "$category", count: { $sum: 1 } } }
            ]);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->workerDistribution->\n`,error)
            throw error;
        }
    }),
    jobStatus: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.aggregate([
                { $group: { _id: "$isAccept", value: { $sum: 1 } } }
            ]);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->jobStatus->\n`,error)
            throw error;
        }
    }),
    getCompletedWorkerCount: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield recentActivity_1.RecentActivityModel.aggregate([
                {
                    $group: {
                        _id: "$workerId",
                        count: { $sum: 1 },
                        earning: { $sum: "$payment" }
                    }
                },
                {
                    $lookup: {
                        from: "workerdetails",
                        localField: "_id",
                        foreignField: "_id",
                        as: "workerDetails"
                    }
                },
                {
                    $unwind: "$workerDetails"
                },
                {
                    $project: {
                        _id: 1,
                        count: 1,
                        earning: 1,
                        "workerDetails.firstName": 1,
                        "workerDetails.category": 1,
                    }
                }
            ]);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getCompletedWorkerCount->\n`,error)
            throw error;
        }
    }),
    getTopWorker: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield review_1.ReviewModel.aggregate([
                {
                    $group: {
                        _id: "$workerId",
                        totalRating: { $sum: "$rating" },
                        reviewCount: { $sum: 1 }
                    }
                },
                {
                    $sort: { totalRating: -1 }
                },
                {
                    $limit: 5
                }
            ]);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getTopWorker->\n`,error)
            throw error;
        }
    }),
    getRecentReview: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield review_1.ReviewModel.find({}).populate('userId', 'username').populate('workerId', 'firstName profile').sort({ createAt: -1 }).limit(6);
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getRecentReview->\n`,error)
            throw error;
        }
    }),
    getSalesDatas: (query, skip, limit) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.find(query, { _id: 1, user: 1, worker: 1, service: 1, preferredDate: 1, isAccept: 1, payment: 1 }).skip(skip).limit(limit).lean();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getRecentReview->\n`,error)
            throw error;
        }
    }),
    getSalesDatasCount: (query) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.find(query).countDocuments();
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getRecentReview->\n`,error)
            throw error;
        }
    }),
    getAllCategory: () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield category_1.CategoryModel.distinct('categoryName');
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getAllCategory->\n`,error)
            throw error;
        }
    }),
    downloadSalesData: (query) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield request_1.RequestModel.find(query, { _id: 1, user: 1, worker: 1, service: 1, preferredDate: 1, isAccept: 1, payment: 1 });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getRecentReview->\n`,error)
            throw error;
        }
    }),
    getWorkerDetails: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            return yield worker_1.WorkerModel.findById({ _id: new ObjectId(workerId) });
        }
        catch (error) {
            // console.log(`Error from infrastructure->database->mongoose->getRecentReview->\n`,error)
            throw error;
        }
    }),
    isBlockWorker: (workerId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield worker_1.WorkerModel.updateOne({ _id: new ObjectId(workerId) }, [{ $set: { isBlocked: { $not: "$isBlocked" } } }]);
        }
        catch (error) {
            throw error;
        }
    })
});
exports.AdminMongoose = AdminMongoose;
