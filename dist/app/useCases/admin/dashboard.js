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
exports.dashboardUsecases = exports.adminOverviewUsecases = exports.workerUsecases = exports.reviewUsecases = void 0;
const admin_1 = require("../../../infrastructure/database/mongoose/admin");
const topWorkelist_1 = require("../../../infrastructure/service/topWorkelist");
// * ADMIN DASHBOARD USECASES ---//
const reviewUsecases = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().getRecentReview();
    }
    catch (error) {
        console.log(`Error from useCases->admin->adminWorkerUsecause\n`, error);
        throw error;
    }
});
exports.reviewUsecases = reviewUsecases;
const workerUsecases = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [getComplete, getTopWorker] = yield Promise.all([
            (0, admin_1.AdminMongoose)().getCompletedWorkerCount(),
            (0, admin_1.AdminMongoose)().getTopWorker()
        ]);
        return yield (0, topWorkelist_1.getWorkerData)(getComplete, getTopWorker);
    }
    catch (error) {
        console.log(`Error from useCases->admin->adminWorkerUsecause\n`, error);
        throw error;
    }
});
exports.workerUsecases = workerUsecases;
const adminOverviewUsecases = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [jobStatus, revenueData, workerDistribution, getAllCategory,] = yield Promise.all([
            (0, admin_1.AdminMongoose)().jobStatus(),
            (0, admin_1.AdminMongoose)().paymentData(),
            (0, admin_1.AdminMongoose)().workerDistribution(),
            (0, admin_1.AdminMongoose)().getAllCategory()
        ]);
        return {
            jobStatus,
            revenueData,
            workerDistribution,
            getAllCategory
        };
    }
    catch (error) {
        console.log(`Error from useCases->admin->adminOverviewUsecases\n`, error);
        throw error;
    }
});
exports.adminOverviewUsecases = adminOverviewUsecases;
const dashboardUsecases = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const [totalRevenue, totalReview, totalWorkers, avgRating] = yield Promise.all([
            (0, admin_1.AdminMongoose)().totalRevenue(),
            (0, admin_1.AdminMongoose)().totalReview(),
            (0, admin_1.AdminMongoose)().totalWorkers(),
            (0, admin_1.AdminMongoose)().avgRating()
        ]);
        return {
            totalRevenue,
            totalReview,
            totalWorkers,
            avgRating,
        };
    }
    catch (error) {
        console.log(`Error from useCases->admin->dashboardUsecases\n`, error);
        throw error;
    }
});
exports.dashboardUsecases = dashboardUsecases;
