"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecentActivityModel = void 0;
const mongoose_1 = require("mongoose");
// Recent Activity Schema
const RecentActivitySchema = new mongoose_1.Schema({
    requestId: { type: mongoose_1.Types.ObjectId, ref: 'Request', required: true },
    workerId: { type: mongoose_1.Types.ObjectId, ref: 'Worker', required: true },
    userId: { type: mongoose_1.Types.ObjectId, ref: 'User', required: true },
    isCompleted: { type: Boolean, default: false },
    status: { type: String, default: 'Pending' },
    paymentId: { type: Number, default: null },
    payment: { type: Number, default: 0 },
}, { timestamps: true });
exports.RecentActivityModel = (0, mongoose_1.model)('RecentActivity', RecentActivitySchema, 'recentactivities');
