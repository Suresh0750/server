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
const user_1 = require("../../../infrastructure/database/mongoose/user");
const bcrypt_1 = require("../../../infrastructure/service/bcrypt");
const LoginVerify = (emailAddress, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { loginVerifyQuery } = (0, user_1.getUserRepository)();
        const actualUser = yield loginVerifyQuery(emailAddress);
        if (!actualUser)
            throw new Error("Invalid EmailAddress");
        else {
            const isCheckPass = yield (0, bcrypt_1.checkPassword)(password, actualUser === null || actualUser === void 0 ? void 0 : actualUser.password);
            return isCheckPass ? actualUser : false;
        }
    }
    catch (err) {
        console.log(`Error from useCases->user->loginVerify ${err}`);
        throw err;
    }
});
exports.LoginVerify = LoginVerify;
