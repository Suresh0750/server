"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RequestModel = void 0;
const mongoose_1 = require("mongoose");
const RequestSchema = new mongoose_1.Schema({
    service: { type: String, required: true },
    worker: { type: String, required: true },
    user: { type: String, required: true },
    preferredDate: { type: String, required: true },
    preferredTime: { type: String, required: true },
    serviceLocation: { type: String, required: true },
    additionalNotes: { type: String, required: true, trim: true },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    workerId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Worker',
        required: true,
    },
    isAccept: {
        type: String,
        enum: ['Pending', 'Accepted', 'Cancelled', 'Completed'],
        default: 'Pending',
    },
    payment: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });
exports.RequestModel = (0, mongoose_1.model)('Request', RequestSchema, 'requests');
