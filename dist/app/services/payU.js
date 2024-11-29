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
exports.IsActivityUsecases = exports.payment = void 0;
// import { PAYU_MERCHANT_KEY, PAYU_SALT } from "../utils/constants";
const paymentTypes_1 = require("../../domain/entities/paymentTypes");
const worker_1 = require("../../infrastructure/database/mongoose/worker");
var jsSHA = require("jssha");
const payment = (paymentData) => {
    try {
        const { txnid, amount, productinfo, firstname, customerEmail } = paymentData;
        console.log({ txnid, amount, productinfo, firstname, customerEmail, PAYU_SALT: paymentTypes_1.PAYU_SALT });
        if (!txnid || !amount || !productinfo || !firstname || !customerEmail) {
            // res.status(400).send();
            const error = new Error('Mandatory fields missing');
            error.statusCode = 502;
            throw error;
        }
        const hashString = `${paymentTypes_1.PAYU_MERCHANT_KEY}|${txnid}|${amount}|${productinfo}|${firstname}|${customerEmail}|||||||||||${paymentTypes_1.PAYU_SALT}`;
        const sha = new jsSHA("SHA-512", "TEXT");
        sha.update(hashString);
        const hash = sha.getHash("HEX");
        // console.log('hash')
        // console.log(hash)
        return { hash: hash };
    }
    catch (error) {
        console.log("error payment:", error);
        throw error;
    }
};
exports.payment = payment;
const IsActivityUsecases = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const res = yield (0, worker_1.getWorkerRepository)().IsActivityQuery(data.productinfo, data.mihpayid);
        yield (0, worker_1.getWorkerRepository)().paymentData(data === null || data === void 0 ? void 0 : data.productinfo, Math.floor(Number(data === null || data === void 0 ? void 0 : data.amount)), Number(data === null || data === void 0 ? void 0 : data.mihpayid));
        // console.log('after update')
        return;
    }
    catch (error) {
        console.log("error payment:", error);
        throw error;
    }
});
exports.IsActivityUsecases = IsActivityUsecases;
