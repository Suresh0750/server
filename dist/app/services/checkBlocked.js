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
exports.checkBlocked = void 0;
const user_1 = require("../../infrastructure/database/mongoose/user");
const worker_1 = require("../../infrastructure/database/mongoose/worker");
//getDataFindById
const checkBlocked = (role, _id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(role, _id);
    switch (role) {
        case 'user':
            const result = yield (0, user_1.getUserRepository)().getDataFindById(_id);
            if (!result) {
                throw new Error('User not found');
            }
            return result === null || result === void 0 ? void 0 : result.isBlocked;
        case 'worker':
            const res = yield (0, worker_1.getWorkerRepository)().getSingleWorkerDetailsQuery(_id);
            if (!res) {
                throw new Error('worker not found');
            }
            return res === null || res === void 0 ? void 0 : res.isBlocked;
    }
});
exports.checkBlocked = checkBlocked;
