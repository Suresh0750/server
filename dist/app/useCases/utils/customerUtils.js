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
exports.getVerifiedWorkerUtils = exports.getCategoryNameUtils = exports.getNearByWorkerListUtils = exports.userRequestUsecases = exports.getUserRequestDataUsecasuse = exports.ReviewUsecases = exports.getReviewUsecases = exports.paymentUsecases = void 0;
const customer_1 = require("../../../infrastructure/database/mongoose/customer");
// * Filter the workers according to the user's location
const workerLocationFilter_1 = require("../../../infrastructure/service/workerLocationFilter");
// * payment details
const paymentUsecases = (requesId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, customer_1.CustomerQueryRepository)().paymentDetails(requesId);
    }
    catch (error) {
        console.log(`Error from useCases->utils-> paymentUsecases \n${error}`);
        throw error;
    }
});
exports.paymentUsecases = paymentUsecases;
// * Review useCases 
const getReviewUsecases = (workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, customer_1.CustomerQueryRepository)().getReview(workerId);
    }
    catch (error) {
        console.log(`Error from useCases->utils-> getReviewUsecases \n${error}`);
        throw error;
    }
});
exports.getReviewUsecases = getReviewUsecases;
const ReviewUsecases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, customer_1.CustomerQueryRepository)().createReview(data);
    }
    catch (error) {
        console.log(`Error from useCases->utils-> ReviewUsecases \n${error}`);
        throw error;
    }
});
exports.ReviewUsecases = ReviewUsecases;
// * getUser Request 
const getUserRequestDataUsecasuse = (userId, workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const payment = yield (0, customer_1.CustomerQueryRepository)().checkUserPayed(workerId, userId);
        const res = yield (0, customer_1.CustomerQueryRepository)().checkExitstRequestQuery(userId, workerId);
        // console.log('usecases getUserRequestDataUsecasuse')
        // console.log(payment)
        // console.log(res)
        if (payment === null || payment === void 0 ? void 0 : payment.paymentId) {
            const result = Object.assign(Object.assign({}, res), { paymentId: payment === null || payment === void 0 ? void 0 : payment.paymentId });
            return result;
        }
        return res;
    }
    catch (error) {
        console.log(`Error from useCases->utils-> getUserRequestDataUsecasuse \n${error}`);
        throw error;
    }
});
exports.getUserRequestDataUsecasuse = getUserRequestDataUsecasuse;
// * userRequest usecses
const userRequestUsecases = (userRequestDetails) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, customer_1.CustomerQueryRepository)().checkExitstRequestQuery(userRequestDetails === null || userRequestDetails === void 0 ? void 0 : userRequestDetails.userId, userRequestDetails === null || userRequestDetails === void 0 ? void 0 : userRequestDetails.workerId);
        // console.log(`Request from userRequestUseCases`)
        // console.log(result)
        if (result && (result === null || result === void 0 ? void 0 : result.isAccept) == "Pending") {
            const error = new Error('Request already exist'); // * if the request already exist means
            error.statusCode = 409;
            throw error;
        }
        console.log(userRequestDetails);
        // const additionalNotes = userRequestDetails.additionalNotes // * change the name convention
        // delete userRequestDetails.additionalNotes 
        // console.log(userRequestDetails)
        return yield (0, customer_1.CustomerQueryRepository)().userRequestQuery(userRequestDetails);
    }
    catch (error) {
        console.log(`Error from useCases->utils-> userRequestUsecases \n${error}`);
        throw error;
    }
});
exports.userRequestUsecases = userRequestUsecases;
// * get workerdetails for emergency details
const getNearByWorkerListUtils = (categoryName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, customer_1.CustomerQueryRepository)().getNearByWorkerListQuery(categoryName);
    }
    catch (error) {
        console.log(`Error from useCases->utils-> getNearByWorkerListUtils \n${error}`);
        throw error;
    }
});
exports.getNearByWorkerListUtils = getNearByWorkerListUtils;
// * get category name utils
const getCategoryNameUtils = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, customer_1.CustomerQueryRepository)().getCategoryName();
    }
    catch (error) {
        console.log(`Error from useCases->utils-> getCategoryNameUtil \n${error}`);
        throw error;
    }
});
exports.getCategoryNameUtils = getCategoryNameUtils;
const getVerifiedWorkerUtils = (lat, lon) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const workerData = yield (0, customer_1.CustomerQueryRepository)().getVerifiedWorker();
        // console.log('all worker')
        // console.log(JSON.stringify(workerData))
        // console.log(lat,lon)
        const res = yield (0, workerLocationFilter_1.FindNearByWorkers)({ latitude: Number(lat), longitude: Number(lon) }, workerData);
        return res;
    }
    catch (error) {
        console.log(`Error from useCases->utils-> getCategoryNameUtil \n${error}`);
        throw error;
    }
});
exports.getVerifiedWorkerUtils = getVerifiedWorkerUtils;
