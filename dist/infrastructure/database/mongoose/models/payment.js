"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    requestId: { type: mongoose_1.Types.ObjectId, ref: 'Request', required: true },
    payment: { type: Number, required: true },
    paymentId: { type: Number, required: true, unique: true },
}, { timestamps: true });
exports.PaymentModel = (0, mongoose_1.model)('Payment', paymentSchema, 'payments');
