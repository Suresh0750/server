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
exports.getAllUserUseCase = exports.isBlockUserUseCases = void 0;
const admin_1 = require("../../../infrastructure/database/mongoose/admin");
const isBlockUserUseCases = (_id, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().isBlockUser(_id, value ? false : true); // * block and unblock the value
    }
    catch (error) {
        console.log(`Error from useCases->admin->isBlockUserUseCases\n`, error);
        throw error;
    }
});
exports.isBlockUserUseCases = isBlockUserUseCases;
const getAllUserUseCase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield (0, admin_1.AdminMongoose)().getAllUserList();
    }
    catch (error) {
        console.log(`Error from useCases->admin->getAllUserUseCase\n`, error);
        throw error;
    }
});
exports.getAllUserUseCase = getAllUserUseCase;
