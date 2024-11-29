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
exports.uploadImage = void 0;
const uploadToS3Bucket_1 = require("../../../infrastructure/service/uploadToS3Bucket");
const uploadImage = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // console.log(`req reached uploadImage useCases `)
        return yield (0, uploadToS3Bucket_1.uploadToS3Bucket)(file); // * upload image to s3 Bucket
    }
    catch (error) {
        console.log(`Error from useCases->utils->uploadImage \n${error}`);
        throw error;
    }
});
exports.uploadImage = uploadImage;
