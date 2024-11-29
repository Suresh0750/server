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
exports.uploadToS3Bucket = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const uploadToS3Bucket = (file) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //* Validate the file object
        if (!Object.keys(file).length) {
            throw new Error("No files uploaded");
        }
        //* Create an S3 client instance
        const s3Client = new client_s3_1.S3Client({
            region: process.env.AWS_REGION,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY,
            },
        });
        //* Prepare the parameters for the S3 upload
        const params = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: `uploads/${Date.now()}_${file.originalname}`,
            Body: file.buffer, // *  File content
            ContentType: file.mimetype, // *  MIME type of the file
            //  ACL: "public-read"
        };
        //*  Create and send the PutObjectCommand
        const command = new client_s3_1.PutObjectCommand(params);
        const x = yield s3Client.send(command);
        // Return a success response or URL if needed
        return `https://${process.env.S3_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${params.Key}`;
    }
    catch (error) {
        // console.error(`Error in infrastructure->service->uploadToS3Bucket \n`, error);
        throw new Error("File upload failed");
    }
});
exports.uploadToS3Bucket = uploadToS3Bucket;
