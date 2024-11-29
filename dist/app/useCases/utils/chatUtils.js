"use strict";
// * chat application send the message between user and worker
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
exports.sendMessage = void 0;
const server_1 = require("../../../server");
const sendMessage = (message) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log('call socket')
        // console.log(message)
        // console.log(JSON.stringify(message))
        yield server_1.io.to(String(message === null || message === void 0 ? void 0 : message.conversationId)).emit("message", message);
    }
    catch (error) {
        console.log(`Error from app->useCause->utils->chatUtils`);
        console.log(error);
        throw error;
    }
});
exports.sendMessage = sendMessage;
