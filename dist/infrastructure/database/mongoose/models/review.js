"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewModel = void 0;
const mongoose_1 = require("mongoose");
// Review Schema
const ReviewSchema = new mongoose_1.Schema({
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    workerId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Worker', required: true },
    requestId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Request', required: true },
}, { timestamps: true } // Automatically adds createdAt and updatedAt
);
exports.ReviewModel = (0, mongoose_1.model)('Review', ReviewSchema, 'reviews');
