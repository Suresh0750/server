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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addtionalProfessionalData = exports.LoginWorkerController = exports.getWorkerDataController = exports.isCheckEmail = exports.ProfessionalInfoControll = exports.PersonalInformationControll = exports.getProjectDetails = exports.addProjectDetails = exports.getSingleWorkerDetails = exports.isRejectWorkController = exports.isAcceptWorkController = exports.getAllRequestController = exports.connectedUsers = exports.messageController = exports.fetchMessage = exports.workComplete = exports.upcomingWorkers = exports.dashboard = void 0;
const loginVerifyWorker_1 = require("../../../app/useCases/worker/loginVerifyWorker");
const forgetPass_1 = require("../../../app/useCases/worker/forgetPass");
const uploadImage_1 = require("../../../app/useCases/utils/uploadImage");
const commonTypes_1 = require("../../../domain/entities/commonTypes");
const encrptionUtils_1 = require("../../../shared/utils/encrptionUtils");
const jwt_1 = require("../../../infrastructure/service/jwt");
const workerUsecases_1 = require("../../../app/useCases/worker/workerUsecases");
const token_1 = require("../../../app/services/token");
// * dashboard
const dashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.session;
        const ratingPromise = yield (0, workerUsecases_1.ratingUsecases)(req.params.Id);
        const resentActivityPromise = yield (0, workerUsecases_1.dashboardUsescases)(customerId || '');
        const result = {
            rating: ratingPromise,
            resentActivity: resentActivityPromise === null || resentActivityPromise === void 0 ? void 0 : resentActivityPromise.resentActivity,
            getRecentActivity: resentActivityPromise === null || resentActivityPromise === void 0 ? void 0 : resentActivityPromise.getRecentActivity,
            totalOffer: resentActivityPromise === null || resentActivityPromise === void 0 ? void 0 : resentActivityPromise.totalOffer
        };
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched', result });
    }
    catch (error) {
        console.log(`Error from presentation layer -> http -> Dashboard \n ${error}`);
        next(error);
    }
});
exports.dashboard = dashboard;
const upcomingWorkers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerUsecases_1.upcomingWorksUsecases)(req.params.id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched', result });
    }
    catch (error) {
        console.log(`Error from presentation layer -> http -> upcomingWorkers \n ${error}`);
        next(error);
    }
});
exports.upcomingWorkers = upcomingWorkers;
// * Mark as complete
const workComplete = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerUsecases_1.markasCompleteUsecases)(req.params.id, req.params.status);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Marked as complete successfully' });
    }
    catch (error) {
        console.log(`Error from presentation layer -> http -> workComplete \n ${error}`);
        next(error);
    }
});
exports.workComplete = workComplete;
// * chat Request details
const fetchMessage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerUsecases_1.fetchMessageUsecases)(req.params.Id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'message successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from presentation layer -> http -> fetchMessage \n ${error}`);
        next(error);
    }
});
exports.fetchMessage = fetchMessage;
const messageController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerUsecases_1.messageUsecases)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'successfully sent message to user' });
    }
    catch (error) {
        console.log(`Error from presentation layer -> http -> messageController\n ${error}`);
        next(error);
    }
});
exports.messageController = messageController;
const connectedUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerUsecases_1.getChatsNameUsecases)(req.params.Id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data successfully fetched', result });
    }
    catch (error) {
        console.log(`Error from presentation layer -> http -> getChatsName\n ${error}`);
        next(error);
    }
});
exports.connectedUsers = connectedUsers;
// * worker Request details 
const getAllRequestController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerUsecases_1.getRequestUsecases)(req.params.workerId);
        // * Check if headers have already been sent
        if (!res.headersSent) {
            return res.status(commonTypes_1.StatusCode.Success).json({
                success: true,
                message: 'Data has been successfully fetched',
                result
            });
        }
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'data has been fetched', result });
    }
    catch (error) {
        console.log(`Error from presentation layer -> http -> getAllRequestController\n ${error}`);
        next(error);
    }
});
exports.getAllRequestController = getAllRequestController;
const isAcceptWorkController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { customerId } = req.session;
        const result = yield (0, workerUsecases_1.isAcceptUseCasess)(req.params.update, (customerId || ''));
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'successfully updated' });
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->isAcceptWorkController\n ${error}`);
        next(error);
    }
});
exports.isAcceptWorkController = isAcceptWorkController;
const isRejectWorkController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(req.params)
        const result = yield (0, workerUsecases_1.isRejectUsecases)(req.params.id);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: "Project has been cancelled" });
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->isRejectWorkController\n ${error}`);
        next(error);
    }
});
exports.isRejectWorkController = isRejectWorkController;
// * get worker Single worker Details
const getSingleWorkerDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerUsecases_1.getSingleWorkerDetailsUsecases)(req.params.workerid);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'single worker details has been fetched', result });
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->getSingleWorkerDetails\n ${error}`);
        next(error);
    }
});
exports.getSingleWorkerDetails = getSingleWorkerDetails;
// * Worker in Project side
const addProjectDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('addProjectDetails')
        // console.log(req.file)
        const file = req.file;
        const imageUrl = yield (0, uploadImage_1.uploadImage)(file);
        req.body.projectImage = imageUrl;
        const result = yield (0, workerUsecases_1.workerProjectUsecases)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Project details has been successfully update' });
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->AddProjectDetails\n ${error}`);
        next(error);
    }
});
exports.addProjectDetails = addProjectDetails;
const getProjectDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('params id')
        // console.log(req.params.id)
        if (req.params.id) {
            const result = yield (0, workerUsecases_1.getWorkerProjectData)(req.params.id);
            return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Worker Project Data has been Fetched', result });
        }
        return res.status(commonTypes_1.StatusCode.BadRequest).json({ success: false, message: 'worker id is required' });
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->getProjectDetails\n ${error}`);
        next(error);
    }
});
exports.getProjectDetails = getProjectDetails;
const PersonalInformationControll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const checkWorker = yield (0, workerUsecases_1.workerExist)(req.body); // * check weather the worker exist or not
        // console.log('check worker')
        // console.log(checkWorker)
        const _b = req.body, { profileImage } = _b, data = __rest(_b, ["profileImage"]); // * for checking
        if (checkWorker && checkWorker.isVerified)
            throw new Error('Email already exist');
        const file = req.file;
        const imageUrl = yield (0, uploadImage_1.uploadImage)(file); // * call uploadImage usecases
        req.body.profile = imageUrl;
        const bcyptPass = yield (0, encrptionUtils_1.hashPassword)((_a = req.body) === null || _a === void 0 ? void 0 : _a.password); // * hash the password
        const workerDetails = req.body;
        workerDetails.password = bcyptPass; // * asign the bcrypt pass
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, workerDetails });
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->PersonalInformation\n ${error}`);
        next(error);
    }
});
exports.PersonalInformationControll = PersonalInformationControll;
const ProfessionalInfoControll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const file = req.file;
        const imageUrl = yield (0, uploadImage_1.uploadImage)(file); // * call uploadImage usecases
        req.body.identity = imageUrl;
        const workerId = yield (0, workerUsecases_1.WorkerUsecase)(req.body);
        const token = yield (0, token_1.generateOtpAccessToken)(workerId);
        res.cookie(commonTypes_1.CookieTypes.Token, token, {
            maxAge: 15 * 60 * 1000,
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            domain: ".profinders.online",
        });
        res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Worker Details has been register', worker: workerId });
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->ProfessionalInfoControll\n ${error}`);
        next(error);
    }
});
exports.ProfessionalInfoControll = ProfessionalInfoControll;
const isCheckEmail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userEmailValidation = yield (0, forgetPass_1.isCheckWorkerEmail)(req.body.emailAddress);
        if (userEmailValidation) {
            return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'verified success', userEmailValidation });
        }
        else {
            const error = new Error('This email is not registered. Please check your email address.');
            error.statusCode = commonTypes_1.StatusCode.NotFound;
            throw error;
        }
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->isCheckEmail\n ${error}`);
        next(error);
    }
});
exports.isCheckEmail = isCheckEmail;
const getWorkerDataController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('req reached worker controller');
        const { workerRefreshToken } = req.cookies;
        // console.log(workerRefreshToken)
        if (!workerRefreshToken)
            return res.status(commonTypes_1.StatusCode.Forbidden).json({ message: "Unauthenticated" });
        const workerData = yield (0, workerUsecases_1.getWorkerData)(workerRefreshToken);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'success', workerData });
    }
    catch (error) {
        console.log(`Error from presentation layer-> http->getWorkerDataController\n ${error}`);
        next(error);
    }
});
exports.getWorkerDataController = getWorkerDataController;
const LoginWorkerController = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const loginUsecase = yield (0, loginVerifyWorker_1.LoginVerify)((_a = req.body) === null || _a === void 0 ? void 0 : _a.emailAddress, (_b = req.body) === null || _b === void 0 ? void 0 : _b.password);
        if (!loginUsecase)
            throw new Error('check email and password');
        else if (loginUsecase.isBlocked) {
            return res.status(commonTypes_1.StatusCode.Forbidden).json({ success: false, errorMessage: "This worker is blocked and cannot perform this action." });
        }
        const { refreshToken, accessToken } = (0, jwt_1.JwtService)(((loginUsecase === null || loginUsecase === void 0 ? void 0 : loginUsecase._id) || '').toString(), loginUsecase.firstName, loginUsecase.emailAddress, (req.body.role || commonTypes_1.Role.Worker));
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
            _id: loginUsecase._id,
            customerName: loginUsecase.firstName,
            customerEmail: loginUsecase.emailAddress,
            role: 'worker'
        };
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'Login successful', customerData });
        // res.status(StatusCode.Unauthorized)
    }
    catch (error) {
        console.log(`Error from Presntation->controllers ${error}`);
        next(error);
    }
});
exports.LoginWorkerController = LoginWorkerController;
const addtionalProfessionalData = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, workerUsecases_1.professionalUsecase)(req.body);
        return res.status(commonTypes_1.StatusCode.Success).json({ success: true, message: 'successfully updated' });
    }
    catch (error) {
        console.log(`Error from Presntation->addtionalProfessionalData ${error}`);
        next(error);
    }
});
exports.addtionalProfessionalData = addtionalProfessionalData;
