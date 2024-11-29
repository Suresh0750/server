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
exports.professionalUsecase = exports.getWorkerData = exports.WorkerUsecase = exports.workerExist = exports.getWorkerProjectData = exports.workerProjectUsecases = exports.getSingleWorkerDetailsUsecases = exports.isRejectUsecases = exports.isAcceptUseCasess = exports.getRequestUsecases = exports.getChatsNameUsecases = exports.messageUsecases = exports.fetchMessageUsecases = exports.dashboardUsescases = exports.ratingUsecases = exports.upcomingWorksUsecases = exports.markasCompleteUsecases = exports.ObjectId = void 0;
const worker_1 = require("../../../infrastructure/database/mongoose/worker");
const otpService_1 = require("../../services/otpService");
const otpStoreData_1 = require("../utils/otpStoreData");
const jwt_1 = require("../../../infrastructure/service/jwt");
const chatUtils_1 = require("../utils/chatUtils");
const mongoose_1 = require("mongoose");
exports.ObjectId = mongoose_1.Types.ObjectId;
// * worker dashboard
const markasCompleteUsecases = (_id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, worker_1.getWorkerRepository)().workCompleteQuery(_id, status == "Completed", status);
        return yield (0, worker_1.getWorkerRepository)().markCompleteQuery(String(res === null || res === void 0 ? void 0 : res.requestId), status);
    }
    catch (error) {
        console.log(`Error from useCases->worker->rating\n`, error);
        throw error;
    }
});
exports.markasCompleteUsecases = markasCompleteUsecases;
const upcomingWorksUsecases = (workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, worker_1.getWorkerRepository)().getUpcomingWorks(workerId);
    }
    catch (error) {
        console.log(`Error from useCases->worker->rating\n`, error);
        throw error;
    }
});
exports.upcomingWorksUsecases = upcomingWorksUsecases;
const ratingUsecases = (workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, worker_1.getWorkerRepository)().ratingQuery(workerId);
    }
    catch (error) {
        console.log(`Error from useCases->worker->rating\n`, error);
        throw error;
    }
});
exports.ratingUsecases = ratingUsecases;
const dashboardUsescases = (workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const resentActivity = yield (0, worker_1.getWorkerRepository)().countResentWorkQuery(workerId);
        const getRecentActivity = yield (0, worker_1.getWorkerRepository)().getRecentActivity(workerId);
        const totalOffer = yield (0, worker_1.getWorkerRepository)().totalOffer(workerId);
        return { resentActivity, getRecentActivity, totalOffer };
    }
    catch (error) {
        console.log(`Error from useCases->worker->dashboardUsescases\n`, error);
        throw error;
    }
});
exports.dashboardUsescases = dashboardUsescases;
// * get chats usecause 
const fetchMessageUsecases = (conversationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, worker_1.getWorkerRepository)().updateIsReadQuery(conversationId);
        return yield (0, worker_1.getWorkerRepository)().fetchMessage(conversationId);
    }
    catch (error) {
        console.log(`Error from useCases->worker->fetchMessageUsecases\n`, error);
        throw error;
    }
});
exports.fetchMessageUsecases = fetchMessageUsecases;
const messageUsecases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { message, conversationId } = data;
        yield (0, worker_1.getWorkerRepository)().messageQuery(data);
        const result = yield (0, worker_1.getWorkerRepository)().getSingleMsg(message);
        if (result)
            yield (0, chatUtils_1.sendMessage)(result); // * here call the socket
        yield (0, worker_1.getWorkerRepository)().updatemessage({ _id: new exports.ObjectId(conversationId), lastMessage: message });
        return;
    }
    catch (error) {
        console.log(`Error from useCases->worker->messageUsecases\n`, error);
        throw error;
    }
});
exports.messageUsecases = messageUsecases;
const getChatsNameUsecases = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, worker_1.getWorkerRepository)().getChatsNameQuery(_id);
        console.log(JSON.stringify(result));
        return result;
    }
    catch (error) {
        console.log(`Error from useCases->worker->getChatsNameUsecases\n`, error);
        throw error;
    }
});
exports.getChatsNameUsecases = getChatsNameUsecases;
// * getAll Request data  of worker
const getRequestUsecases = (workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, worker_1.getWorkerRepository)().getAllRequestQuery(workerId);
    }
    catch (error) {
        console.log(`Error from useCases->worker->getAllWorkerUseCases\n`, error);
        throw error;
    }
});
exports.getRequestUsecases = getRequestUsecases;
const isAcceptUseCasess = (data, workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { _id, isPayment, userId } = JSON.parse(data);
        yield (0, worker_1.getWorkerRepository)().isAcceptWorkQuery(_id, Number(isPayment));
        return yield (0, worker_1.getWorkerRepository)().isResendActivityQuery(_id, Number(isPayment), workerId, userId);
    }
    catch (error) {
        console.log(`Error from useCases->worker->isAcceptUseCasess\n`, error);
        throw error;
    }
});
exports.isAcceptUseCasess = isAcceptUseCasess;
const isRejectUsecases = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, worker_1.getWorkerRepository)().isRejectWorkQuery(_id);
    }
    catch (error) {
        console.log(`Error from useCases->worker->isRejectUsecases\n`, error);
        throw error;
    }
});
exports.isRejectUsecases = isRejectUsecases;
// * get Single worker Details
const getSingleWorkerDetailsUsecases = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, worker_1.getWorkerRepository)().getSingleWorkerDetailsQuery(_id);
    }
    catch (error) {
        console.log(`Error from useCases->worker->getSingleWorkerDetailsUsecases\n`, error);
        throw error;
    }
});
exports.getSingleWorkerDetailsUsecases = getSingleWorkerDetailsUsecases;
// * worker upload project details usecses
const workerProjectUsecases = (workerProjectDetails) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(workerProjectDetails);
    try {
        const { _id, projectName, projectDescription, projectImage } = workerProjectDetails;
        const ProjectDetails = {
            projectName,
            projectDescription,
            projectImage
        };
        if (_id)
            yield (0, worker_1.getWorkerRepository)().addWorkerProjectDetails(_id, ProjectDetails);
        return;
    }
    catch (error) {
        console.log(`Error from useCases->worker->workerProjectUsecases\n`, error);
        throw error;
    }
});
exports.workerProjectUsecases = workerProjectUsecases;
const getWorkerProjectData = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(_id)
        return yield (0, worker_1.getWorkerRepository)().getProjectDetailsQuery(_id);
    }
    catch (error) {
        console.log(`Error from useCases->worker->getWorkerProjectData\n`, error);
        throw error;
    }
});
exports.getWorkerProjectData = getWorkerProjectData;
const workerExist = (workerData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { findWorker } = (0, worker_1.getWorkerRepository)();
        return yield findWorker(workerData.emailAddress); // * check the worker already exite or not  
    }
    catch (error) {
        console.log(`Error from workerExist`, error);
        throw error;
    }
});
exports.workerExist = workerExist;
const WorkerUsecase = (workerData) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // console.log(workerData)
        let { firstName, lastName, phoneNumber, emailAddress, postalCode, password, latitude, longitude, profile, identity, category, country, state, city, streetAddress, apt, coord, mapAddress } = workerData;
        console.log('step1');
        let data = {
            firstName,
            lastName,
            phoneNumber,
            emailAddress,
            password,
            profile,
            identity,
            apt,
            category,
            country,
            state,
            city,
            postalCode,
            streetAddress,
            latitude: Number(latitude),
            longitude: Number(longitude)
        };
        // console.log(mapAddress)
        // console.log('step2')
        mapAddress = JSON.parse(mapAddress);
        // console.log('step3')
        if (mapAddress === null || mapAddress === void 0 ? void 0 : mapAddress.country)
            data.country = mapAddress === null || mapAddress === void 0 ? void 0 : mapAddress.country;
        if (mapAddress === null || mapAddress === void 0 ? void 0 : mapAddress.postcode)
            data.postalCode = mapAddress === null || mapAddress === void 0 ? void 0 : mapAddress.postcode;
        if (mapAddress === null || mapAddress === void 0 ? void 0 : mapAddress.state)
            data.state = mapAddress === null || mapAddress === void 0 ? void 0 : mapAddress.state;
        // console.log('step4')
        const { createWorker } = (0, worker_1.getWorkerRepository)();
        // console.log('step5')
        // console.log(data)
        const workerDetails = yield createWorker(data);
        const { customerOTP, customerId } = yield (0, otpService_1.OtpService)((_a = (workerDetails === null || workerDetails === void 0 ? void 0 : workerDetails._id)) === null || _a === void 0 ? void 0 : _a.toString(), ((workerDetails === null || workerDetails === void 0 ? void 0 : workerDetails.emailAddress) || ''));
        yield (0, otpStoreData_1.OtpStoreData)(customerId, customerOTP);
        return customerId;
    }
    catch (error) {
        console.log(`Error from usecases -> workerUsecase`, error);
        throw error;
    }
});
exports.WorkerUsecase = WorkerUsecase;
const getWorkerData = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const customer = (0, jwt_1.verifyRefreshToken)(token);
        // console.log('customer')
        // console.log(customer)
        const { getWorkerData } = (0, worker_1.getWorkerRepository)();
        return getWorkerData(customer === null || customer === void 0 ? void 0 : customer.customerId);
        // getWorkerData
    }
    catch (error) {
        console.log(`Error from usecases -> getWorkerData`, error);
        throw error;
    }
});
exports.getWorkerData = getWorkerData;
const professionalUsecase = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return (0, worker_1.getWorkerRepository)().availabilityInfo(data);
    }
    catch (error) {
        console.log(`Error from usecases -> professionalUsecase`, error);
        throw error;
    }
});
exports.professionalUsecase = professionalUsecase;
