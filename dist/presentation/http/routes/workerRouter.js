"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("../../../infrastructure/service/multer"));
const verifyTokenAndRole_1 = require("../middlewares/verifyTokenAndRole");
const worker_1 = require("../controllers/worker");
const validationMiddleware_1 = require("../middlewares/validationMiddleware");
const workerRouter = (0, express_1.Router)();
// * worker dashboard
workerRouter.get('/dashboard/:Id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.dashboard);
workerRouter.get('/upcoming-workers/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.upcomingWorkers);
workerRouter.put('/markStatus/:status/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.workComplete);
// * chats in worker side
workerRouter.get('/connected-users/:Id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.connectedUsers);
workerRouter.put('/message', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.messageController);
workerRouter.get('/fetchmessage/:Id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.fetchMessage);
// * request details or woker
workerRouter.get("/getRequestData/:workerId", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.getAllRequestController);
workerRouter.put("/isAcceptWork/:update", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.isAcceptWorkController);
workerRouter.put("/rejectWork/:id", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.isRejectWorkController);
// * get single worker Details
workerRouter.get('/singleWorkerDetails/:workerid/:userId', worker_1.getSingleWorkerDetails);
// * Worker in worker Project upload 
workerRouter.post("/uploadWorkerProject", multer_1.default.single('image'), worker_1.addProjectDetails);
workerRouter.get('/getWorkerProject/:id', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.getProjectDetails);
workerRouter.post("/personalinfo", multer_1.default.single('profileImage'), worker_1.PersonalInformationControll);
workerRouter.post("/ProfessionalInfo", multer_1.default.single('identity'), worker_1.ProfessionalInfoControll);
workerRouter.post("/checkEmailForgetPass", worker_1.isCheckEmail);
workerRouter.get("/getWorkerData", (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.getWorkerDataController);
workerRouter.post('/loginverify', validationMiddleware_1.isEmailValidate, worker_1.LoginWorkerController);
workerRouter.put('/addtionalProfessionalDetails', (0, verifyTokenAndRole_1.verifyTokenAndRole)(['worker']), worker_1.addtionalProfessionalData);
exports.default = workerRouter;
