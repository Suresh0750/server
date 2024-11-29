"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const verifyTokenAndRole_1 = require("../middlewares/verifyTokenAndRole");
const multer_1 = __importDefault(require("../../../infrastructure/service/multer"));
const customerController_1 = require("../controllers/customerController");
const customerRouter = (0, express_1.Router)();
// * Review of worker
customerRouter.get("/review/:id", customerController_1.getReviewController);
customerRouter.post("/review", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user', 'worker']), customerController_1.ReviewController);
// * payment gatway
customerRouter.post("/paymentAPI", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user', 'worker']), customerController_1.paymetnAPIController);
customerRouter.post("/savePaymentId", customerController_1.paymentIdController);
customerRouter.get("/payment-details/:requestId", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user', 'worker']), customerController_1.paymentDetails);
// * router for Request 
customerRouter.post('/userRequestWorker', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user', 'worker']), customerController_1.userRequestWorkerController);
customerRouter.post('/verifyOTP', customerController_1.CustomerOtpController);
customerRouter.post('/resentOTP', customerController_1.ResentOTP);
customerRouter.post('/setForgotPassword', customerController_1.ForgetPassWordController);
customerRouter.post('/CustomerGoogleLogin', multer_1.default.single('Identity'), customerController_1.GoogleLogin);
customerRouter.post("/cutomerLogout", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user', 'worker']), customerController_1.CustomerLogoutController);
customerRouter.post("/customerGoogleVerification", customerController_1.WorkerGoogleLoginWithRegistrastion); // * worker login with google
// customerRouter.post
customerRouter.get('/getALLVerifiedWorker/:lat/:lon', customerController_1.getVerifiedWorkerController);
customerRouter.get('/getCategoryName', customerController_1.getCategoryName);
customerRouter.post('/getNearByWorkerDetails/:categoryName', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user', 'worker']), customerController_1.getNearByWorkerDetailsController);
exports.default = customerRouter;
