"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandles = void 0;
const commonTypes_1 = require("../../../domain/entities/commonTypes");
const errorHandles = (err, req, res, next) => {
    // console.log(err.message)
    // console.log(req.originalUrl)
    // console.log(err)
    let statusCode = (err === null || err === void 0 ? void 0 : err.statusCode) || commonTypes_1.StatusCode.NotFound;
    let errorMessage = (err === null || err === void 0 ? void 0 : err.message) || 'An unexpected error';
    console.log(errorMessage);
    console.log('error Handles\n', errorMessage.message);
    res.status(statusCode).send({ errorMessage, success: false });
};
exports.errorHandles = errorHandles;
