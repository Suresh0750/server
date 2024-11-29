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
exports.isBlockUsecases = exports.getDetails = exports.getALLWorkerUseCases = void 0;
const admin_1 = require("../../../infrastructure/database/mongoose/admin");
const getALLWorkerUseCases = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().getAllWorkerList();
    }
    catch (error) {
        console.log(`Error from useCases->admin->getALLWorkerUseCases\n`, error);
        throw error;
    }
});
exports.getALLWorkerUseCases = getALLWorkerUseCases;
const getDetails = (workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().getWorkerDetails(workerId);
    }
    catch (error) {
        console.log(`Error from useCases->admin->getDetails\n`, error);
        throw error;
    }
});
exports.getDetails = getDetails;
// * worker Block
const isBlockUsecases = (workerId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().isBlockWorker(workerId);
    }
    catch (error) {
        console.log(`Error from useCases->admin->isBlockUsecases\n`, error);
        throw error;
    }
});
exports.isBlockUsecases = isBlockUsecases;
