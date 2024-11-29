"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkerModel = void 0;
const mongoose_1 = require("mongoose");
// Worker Schema
const workerSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    phoneNumber: { type: Number, required: true },
    emailAddress: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profile: { type: String, default: "" },
    category: { type: String, required: true },
    country: { type: String, required: true },
    streetAddress: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    apt: { type: String, default: "" },
    identity: { type: String, required: true },
    postalCode: { type: String, required: true },
    workerImage: [
        {
            projectName: { type: String, required: true },
            projectDescription: { type: String, required: true },
            projectImage: { type: String, required: true },
        },
    ],
    experience: { type: String },
    availability: { type: String },
    rate: { type: Number },
    isVerified: { type: Boolean, default: false },
    isWorker: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
}, { timestamps: true });
const WorkerModel = (0, mongoose_1.model)('Worker', workerSchema, 'workers');
exports.WorkerModel = WorkerModel;
