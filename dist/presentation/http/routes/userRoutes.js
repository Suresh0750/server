"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const multer_1 = __importDefault(require("../../../infrastructure/service/multer"));
const user_1 = require("../controllers/user");
// * authendication middleware 
const verifyTokenAndRole_1 = require("../middlewares/verifyTokenAndRole");
const userRouter = (0, express_1.Router)();
// * Role based authendication
// * authendication 
userRouter.post('/userSignup', validationMiddleware_1.validateUserSignUp, user_1.userSignupController);
userRouter.post('/loginverify', validationMiddleware_1.isEmailValidate, user_1.LoginUser);
userRouter.post('/checkEmailForgetPass', validationMiddleware_1.isEmailValidate, user_1.isCheckEmail); // * check the email for forget Password page
// * user dashboard
userRouter.get('/profile/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user']), user_1.profile);
userRouter.put('/updateprofile', multer_1.default.single('newImageData'), (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user']), user_1.editprofile);
userRouter.get('/booking/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user']), user_1.getBooking);
userRouter.get('/paymentId/:requestId', user_1.paymentId);
// * chats
userRouter.post('/conversation', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user']), user_1.conversation);
userRouter.get('/conversation/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user']), user_1.getConversation);
userRouter.get('/message/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['user']), user_1.getMessage);
exports.default = userRouter;
