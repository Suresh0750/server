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
exports.LoginVerify = void 0;
const worker_1 = require("../../../infrastructure/database/mongoose/worker");
const bcrypt_1 = require("../../../infrastructure/service/bcrypt");
const LoginVerify = (EmailAddress, Password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loginVerifyQuery } = (0, worker_1.getWorkerRepository)();
        const actualWorker = yield loginVerifyQuery(EmailAddress);
        if (!actualWorker)
            throw new Error("Invalid EmailAddress");
        else {
            const isCheckPass = yield (0, bcrypt_1.checkPassword)(Password, actualWorker === null || actualWorker === void 0 ? void 0 : actualWorker.password);
            return isCheckPass ? actualWorker : false;
        }
    }
    catch (err) {
        console.log(`Error from useCases->user->loginVerify ${err}`);
        throw err;
    }
});
exports.LoginVerify = LoginVerify;
